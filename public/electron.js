const { app, BrowserWindow } = require("electron");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 420,
    height: 760,
    resizable: false,
    titleBarStyle: "hidden",
    maximizable: false,
    title: "Keynome",
    trafficLightPosition: { x: 10, y: 10 },
  });
  win.loadFile(path.join(__dirname, "../build/index.html"));
};

app.whenReady().then(() => {
  createWindow();
  app.commandLine.appendSwitch("disable-renderer-backgrounding");
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
