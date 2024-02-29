"use strict";
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const { setMenu} = require('./src/menu/menuTemplate');


if(process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    });
}

let mainWindow;
app.on('ready', () => {
    mainWindow = new BrowserWindow({ width: 800, height: 600 });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src', 'views','index.html'),
        protocol: 'file:',
        slashes: true
    }));

    setMenu();
});
