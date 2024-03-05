const { BrowserWindow } = require('electron');
const { setMenu } = require('./src/menu/menuTemplate');
const path = require('path');
const url = require('url');
const { initializeDatabase } = require('./database');
const{ ipcMain } = require('electron');
const {saveStudent} = require('./src/db/crud/studentsCrud');

ipcMain.on('invoke-saveStudent', async (event, studentData) => {
    try {
        const student = await saveStudent(studentData);
        console.log('Estudiante guardado en la base de datos:', student.toJSON());
        event.reply('response-saveStudent', student);
    } catch (error) {
        console.error('Error al guardar el estudiante:', error);
        event.reply('response-saveStudent', { error: error.message });
    }
});

let mainWindow;
function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
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
