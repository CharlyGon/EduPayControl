const { setMenu } = require('./src/menu/menuTemplate');
const { initializeDatabase } = require('./database');
const { ipcMain } = require('electron');
const { saveStudent } = require('./src/db/crud/studentsCrud');
const { createMainWindow } = require('./src/windows/mainWindows');

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

function mainWindow() {
    createMainWindow();
    setMenu();
    initializeDatabase();
}

module.exports = { mainWindow };
