const { setMenu } = require('./src/menu/menuTemplate');
const { initializeDatabase } = require('./database');
const { ipcMain } = require('electron');
const { saveStudent, getStudents } = require('./src/db/crud/studentsCrud');
const { createMainWindow } = require('./src/windows/mainWindows');

ipcMain.on('invoke-saveStudent', (event, studentData) => {
    saveStudent(studentData)
        .then(student => {
            console.log('Estudiante guardado en la base de datos:', student.toJSON());
            event.reply('response-saveStudent', student);
        })
        .catch(error => {
            console.error('Error al guardar el estudiante:', error);
            event.reply('response-saveStudent', { error: error.message });
        });
});

ipcMain.on('invoke-findStudents', (event, criteria) => {
    getStudents(criteria)
        .then(students => {
            console.log('Estudiantes encontrados:', students);
            event.reply('response-findStudents', students);
        })
        .catch(error => {
            console.error('Error al buscar estudiantes:', error);
            event.reply('response-findStudents', { error: error.message });
        });
});

function mainWindow() {
    createMainWindow();
    setMenu();
    initializeDatabase();
}

module.exports = { mainWindow };
