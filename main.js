const { app, BrowserWindow } = require('electron');
const { __dirname, process } = require('globalthis/implementation');
const path = require('path');

function createWindow() {
  //Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
    frame: false,
    fullscreen: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    }
  });

  //Loading the index.html of the app
  mainWindow.maximize();
  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadFile('data/pages/app.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function() {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') app.quit();
});