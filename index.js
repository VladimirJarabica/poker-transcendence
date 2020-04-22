const { app, BrowserWindow, ipcMain } = require("electron");
const ioHook = require("iohook");

app.allowRendererProcessReuse = true;

app.on("ready", () => {
  const win = new BrowserWindow({
    width: 60,
    height: 60,
    webPreferences: { nodeIntegration: true },
    alwaysOnTop: true,
    frame: null,
  });

  win.loadURL(`file://${__dirname}/index.html`);

  win.removeMenu();

  win.webContents.on("did-finish-load", () => {
    win.webContents.send("ping", "");
    console.log("did finish");
  });

  ioHook.on("mousedown", (event) => {
    win.webContents.send("ping", "");
  });

  ioHook.start();
});

process.on("exit", () => {
  ioHook.unload();
});
