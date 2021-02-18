const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({ 
        width: 1400, 
        height: 900, 
        webPreferences: { 
            nodeIntegration: true,
            webviewTag: false,
        },
        resizable: false,
    });
    const startUrl = 'http://localhost:3000';
    mainWindow.loadURL(startUrl);
    mainWindow.webContents.openDevTools();
    mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit();
});

app.on('activate', () => {
    if (mainWindow === null)
        createWindow();
});