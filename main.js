const { BrowserWindow } = require('electron');
const { setMenu } = require('./src/menu/menuTemplate');
const path = require('path');
const url = require('url');
const { initializeDatabase } = require('./database');

let mainWindow;
function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src', 'views', 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    setMenu();
    initializeDatabase();
}

module.exports = { createMainWindow };
