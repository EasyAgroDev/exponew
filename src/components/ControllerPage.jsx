import { useState } from "react";

const descriptions = {
  HomePage: "The dashboard shows sensor readings, flock status, weather, quick actions, and fan status.",
  Menu: "Open controller features such as alarms, heating, fans, feeding, ventilation, and system settings.",
  Alarm: "Configure and monitor alarm settings.",
  AlarmEvent1: "Review recent alarm events.",
  AlarmEvent2: "Review additional alarm event details.",
  Heater: "Temperature controls for the heating system.",
  FAN: "Manage fan operation and ventilation settings.",
  FANSETTING: "Configure fan settings.",
  MINIMUMVENTILATION: "Configure minimum ventilation settings.",
  Feeding: "Control the automatic feeding system.",
  Fogger: "Manage humidity and fogging controls.",
  CoolingPad: "Manage cooling pad operation.",
  Tunnelinlet: "Configure tunnel ventilation settings.",
  CrossVent: "Configure cross-ventilation settings.",
  TodayPlanner: "View and configure the daily planner.",
  TodayTargets: "Review the current flock targets.",
  TodayRequirement: "Review the flock's daily requirements.",
  Report: "Choose daily or minimum and maximum reports.",
  DailyReportFDE1: "Review daily flock data entry reports.",
  DailyReportFilter: "Filter daily report information.",
  "Min&MaxReport": "Review minimum and maximum reports.",
  "Min&MaxReport(1)": "Review minimum and maximum report details.",
  "Min&MaxReport(2)": "Review additional minimum and maximum report details.",
  FlockDataEntry: "Manage and review flock-related data.",
  Light: "Configure lighting schedules and intensity.",
  SystemSetting: "Open date, calibration, testing, output, level, system, password, and reset settings.",
  DateSet: "Set system date and time.",
  Calibration: "Review calibration settings.",
  TestPage: "Open system diagnostic tools and tests.",
  OutputSettings: "Configure controller outputs.",
  LevelSetting: "Configure level settings.",
  System: "Review system information and settings.",
  Password: "Manage controller password settings.",
  Reset: "Review reset options.",
  "DG&MainAlarm": "Review generator and main alarm settings.",
  UserSetting: "Configure user settings.",
  advancesetting: "Review advanced controller settings.",
  alarm: "Configure and monitor alarm settings.",
  calibration: "Review calibration settings.",
  coolpad: "Manage cooling pad operation.",
  crossvent: "Configure cross-ventilation settings.",
  dateset: "Set system date and time.",
  fan: "Manage fan operation and ventilation settings.",
  feed: "Control the automatic feeding system.",
  flock: "Manage and review flock-related data.",
  fogger: "Manage humidity and fogging controls.",
  heater: "Temperature controls for the heating system.",
  home: "The dashboard shows sensor readings, flock status, and system controls.",
  light: "Configure lighting schedules and intensity.",
  menu: "Open a controller feature using the buttons below.",
  minmaxreport: "Review minimum and maximum reports.",
  selectsensor: "Select and configure system sensors.",
  test: "Open system diagnostic tools and tests.",
  tunnel: "Configure tunnel ventilation settings.",
};

const newScreens = [
  ["home", "Home", "HomePage.png"],
  ["menu", "Menu", "Menu.png"],
  ["Alarm", "Alarm", "Alarm.png"],
  ["AlarmEvent1", "Alarm events", "AlarmEvent1.png"],
  ["AlarmEvent2", "Alarm event details", "AlarmEvent2.png"],
  ["DG&MainAlarm", "DG & main alarm", "DG&MainAlarm.png"],
  ["Heater", "Heater", "Heater.png"],
  ["FAN", "Fan", "FAN.png"],
  ["FANSETTING", "Fan settings", "FANSETTING.png"],
  ["MINIMUMVENTILATION", "Minimum ventilation", "MINIMUMVENTILATION.png"],
  ["Feeding", "Feeding", "Feeding.png"],
  ["Fogger", "Fogger", "Fogger.png"],
  ["CoolingPad", "Cooling pad", "CoolingPad.png"],
  ["Tunnelinlet", "Tunnel inlet", "Tunnelinlet.png"],
  ["CrossVent", "Cross ventilation", "CrossVent.png"],
  ["TodayPlanner", "Today planner", "TodayPlanner.png"],
  ["TodayTargets", "Today targets", "TodayTargets.png"],
  ["TodayRequirement", "Today requirement", "TodayRequirement.png"],
  ["Report", "Reports", "Report.png"],
  ["DailyReportFDE1", "Daily report", "DailyReportFDE1.png"],
  ["DailyReportFilter", "Daily report filter", "DailyReportFilter.png"],
  ["Min&MaxReport", "Min & max report", "Min&MaxReport.png"],
  ["Min&MaxReport(1)", "Min & max report details", "Min&MaxReport(1).png"],
  ["Min&MaxReport(2)", "Min & max report details 2", "Min&MaxReport(2).png"],
  ["FlockDataEntry", "Flock data entry", "FlockDataEntry.png"],
  ["Light", "Light", "Light.png"],
  ["SystemSetting", "System settings", "SystemSetting.png"],
  ["DateSet", "Date and time", "DateSet.png"],
  ["Calibration", "Calibration", "Calibration.png"],
  ["TestPage", "Test page", "TestPage.png"],
  ["OutputSettings", "Output settings", "OutputSettings.png"],
  ["LevelSetting", "Level settings", "LevelSetting.png"],
  ["System", "System", "System.png"],
  ["Password", "Password", "Password.png"],
  ["Reset", "Reset", "Reset.png"],
  ["UserSetting", "User settings", "UserSetting.png"],
  ["advancesetting", "Advanced settings", "SystemSetting.png"],
];

const oldScreens = [
  ["home", "Home", "home.png"],
  ["menu", "Menu", "menu.png"],
  ["alarm", "Alarm", "alarm.png"],
  ["heater", "Heater", "heater.png"],
  ["fan", "Fan", "fan.png"],
  ["feed", "Feeding", "feed.png"],
  ["fogger", "Fogger", "fogger.png"],
  ["coolpad", "Cooling pad", "coolpad.png"],
  ["tunnel", "Tunnel", "tunnel.png"],
  ["crossvent", "Cross ventilation", "crossvent.png"],
  ["selectsensor", "Select sensor", "selectsensor.png"],
  ["test", "Test page", "test.png"],
  ["light", "Light", "light.png"],
  ["calibration", "Calibration", "calibration.png"],
  ["advancesetting", "Advanced settings", "advancesetting.png"],
  ["dateset", "Date and time", "dateset.png"],
  ["minmaxreport", "Min & max report", "minmaxreport.png"],
  ["flock", "Flock", "flock.png"],
];

export default function ControllerPage({ version }) {
  const isNew = version === "new";
  const screens = isNew ? newScreens : oldScreens;
  const folder = isNew ? "new" : "old";
  const homeId = "home";
  const [history, setHistory] = useState([homeId]);
  const [infoOpen, setInfoOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const currentId = history[history.length - 1];
  const current = screens.find(([id]) => id === currentId) ?? screens[0];
  const [id, label, file] = current;

  const openScreen = (nextId) => {
    if (!screens.some(([screenId]) => screenId === nextId)) {
      return;
    }
    setInfoOpen(false);
    setImageError(false);
    setHistory((previous) => [...previous, nextId]);
  };

  const goBack = () => {
    setInfoOpen(false);
    setHistory((previous) => previous.length > 1 ? previous.slice(0, -1) : [homeId]);
  };

  const goHome = () => {
    setInfoOpen(false);
    setHistory([homeId]);
  };

  return (
    <main className="controller-page">
      <section className="controller-intro">
        <span className="eyebrow">INTERACTIVE SIMULATOR</span>
        <h1>{isNew ? "EV-16" : "VEE-1314"} <em>Controller</em></h1>
        <p>Explore controller screens using the controls below the display.</p>
      </section>
      <section className="controller-workspace" aria-label={`${label} controller screen`}>
        <div className="controller-frame">
          <div className="controller-frame-top">
            <span className="controller-light" />
            <span>{isNew ? "EV-16" : "VEE-1314"} CONTROL SYSTEM</span>
            <button
              type="button"
              className="controller-info-toggle"
              aria-expanded={infoOpen}
              onClick={() => setInfoOpen((open) => !open)}
            >
              {infoOpen ? "Close info" : "Screen info"}
            </button>
          </div>
          <div className="controller-screen">
            {imageError ? (
              <p className="controller-image-error" role="alert">
                The {label} screen image could not be loaded.
              </p>
            ) : (
              <img
                src={`/Controller/${folder}/${encodeURI(file)}`}
                alt={`${label} screen for the ${isNew ? "EV-16" : "VEE-1314"} controller`}
                onError={() => setImageError(true)}
              />
            )}
            {infoOpen && (
              <div className="controller-info-panel" role="status">
                <strong>{label}</strong>
                <p>{descriptions[id] ?? "Explore this controller screen using the controls below."}</p>
              </div>
            )}
          </div>
          <div className="controller-controls">
            <button type="button" onClick={goBack} disabled={history.length < 2}>Back</button>
            <button type="button" onClick={goHome}>Home</button>
            <button type="button" onClick={() => openScreen("menu")}>Menu</button>
          </div>
        </div>
        <div className="controller-screen-list">
          <div className="controller-list-heading">
            <h2>Controller screens</h2>
            <span>{screens.length} screens</span>
          </div>
          <div className="controller-screen-grid">
            {screens.map(([screenId, screenLabel]) => (
              <button
                type="button"
                className={`controller-screen-button ${id === screenId ? "controller-screen-button-active" : ""}`}
                key={screenId}
                aria-current={id === screenId ? "page" : undefined}
                onClick={() => openScreen(screenId)}
              >
                {screenLabel}
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
