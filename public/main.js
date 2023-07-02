const { app, BrowserWindow, ipcMain, shell } = require("electron");
const path = require("path");

let mainWindow;
const isMac = process.platform === "darwin";
const isDev = process.env.NODE_ENV !== "development";

app.commandLine.appendSwitch("ignore-certificate-errors");
app.commandLine.appendSwitch("allow-insecure-localhost", "true");

app.on(
  "certificate-error",
  (event, webContents, url, error, certificate, callback) => {
    event.preventDefault();
    callback(true);
  }
);
function createMainWindow() {
  mainWindow = new BrowserWindow({
    height: 800,
    with: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      nodeIntegrationInWorker: true,
      nodeIntegrationInSubFrames: true,
    },
  });
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadURL("http://localhost:3000/");
}

app.whenReady().then(() => {
  createMainWindow();
  // implement menu

  mainWindow.on("closed", () => (mainWindow = null));
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});

ipcMain.on("save:json", (e, options) => {
  console.log(options);
});
