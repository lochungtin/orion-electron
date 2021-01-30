const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

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
    mainWindow.loadURL('http://localhost:3000');
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