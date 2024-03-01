const { app } = require('electron');
const path = require('path');
const { createMainWindow } = require('./main');

if (process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    });
}

app.on('ready', () => {
    createMainWindow();
});
