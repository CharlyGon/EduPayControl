const { BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let loadStudentsWindow;

function createStudentsWindow() {
    loadStudentsWindow = new BrowserWindow({ width: 800, height: 600 });
    loadStudentsWindow.loadURL(url.format({
        pathname: path.join(__dirname, '..', 'views', 'loadStudents.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Manejar el cierre de la ventana
    loadStudentsWindow.on('closed', () => {
        loadStudentsWindow = null;
    });
}

module.exports = { createStudentsWindow };
