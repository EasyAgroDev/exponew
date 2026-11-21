import { createHash } from "node:crypto";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

function offlineAssetsPlugin() {
  return {
    name: "offline-assets",
    apply: "build",
    writeBundle(outputOptions) {
      const outputDirectory = resolve(outputOptions.dir || "dist");
      const files = [];

      const collectFiles = (directory) => {
        for (const entry of readdirSync(directory, { withFileTypes: true })) {
          const filePath = join(directory, entry.name);
          if (entry.isDirectory()) {
            collectFiles(filePath);
          } else if (!entry.name.endsWith(".map") && entry.name !== "service-worker.js") {
            files.push({
              path: relative(outputDirectory, filePath).split(sep).join("/"),
              content: readFileSync(filePath),
            });
          }
        }
      };

      collectFiles(outputDirectory);
      files.sort((first, second) => first.path.localeCompare(second.path));

      const hash = createHash("sha256");
      for (const file of files) {
        hash.update(file.path);
        hash.update(file.content);
      }

      const precachePaths = files.map(({ path }) => path);
      const serviceWorker = `
const CACHE_NAME = "easy-agrotech-${hash.digest("hex").slice(0, 12)}";
const PRECACHE_PATHS = ${JSON.stringify(precachePaths)};
const INDEX_URL = new URL("index.html", self.registration.scope).href;

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(PRECACHE_PATHS.map((path) => new URL(path, self.registration.scope).href));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames
      .filter((name) => name.startsWith("easy-agrotech-") && name !== CACHE_NAME)
      .map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        return await fetch(request);
      } catch {
        return (await caches.match(INDEX_URL)) || Response.error();
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;

    const response = await fetch(request);
    if (response.ok && response.type === "basic") {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, response.clone());
    }
    return response;
  })());
});
`;

      writeFileSync(join(outputDirectory, "service-worker.js"), serviceWorker.trimStart());
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), offlineAssetsPlugin()],
});
