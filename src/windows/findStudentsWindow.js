const {BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

let findStudentsWindow;

function findStudents() {
    findStudentsWindow = new BrowserWindow({width: 800, height: 600});
    findStudentsWindow.loadURL(url.format({
        pathname: path.join(__dirname, '..', 'views', 'findStudents.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Manejar el cierre de la ventana
    findStudentsWindow.on('closed', () => {
        findStudentsWindow = null;
    });
}

module.exports = {findStudents};
