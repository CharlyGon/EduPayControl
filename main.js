const { setMenu } = require('./src/menu/menuTemplate');
const { initializeDatabase } = require('./database');
const { ipcMain, dialog } = require('electron');
const { saveStudent, getStudents } = require('./src/db/crud/studentsCrud');
const { createMainWindow } = require('./src/windows/mainWindows');
const { studentWindow } = require('./src/windows/studentDetailsWindows');
const { getStudentById } = require('./src/db/crud/studentsCrud');
const { deleteStudent } = require('./src/db/crud/studentsCrud');

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

ipcMain.on('show-student-details', async (event, studentId) => {
    try {
        const studentDetails = await getStudentById(studentId);
        console.log('Mostrar detalles del estudiante: Main', studentDetails);
        studentWindow(studentDetails);

    } catch (error) {
        console.error('Error al mostrar detalles del estudiante:', error);
    }
});

ipcMain.on('invoke-deleteStudent', async (event, studentId) => {
    try {
        const studentDeleted = await deleteStudent(studentId.id);
        event.reply('response-deleteStudent', studentDeleted);

        dialog.showMessageBox({
            type: 'info',
            title: 'Eliminar estudiante',
            message: 'Estudiante eliminado correctamente',
            buttons: ['Aceptar']
        }).then(() => {
            // Enviar un mensaje a la ventana studentDetailsWindow para que se cierre
            event.sender.send('close-studentDetailsWindow');
        });

        console.log('Estudiante eliminado:', studentId);
    } catch (error) {
        console.error('Error al eliminar el estudiante:', error);
        event.reply('response-deleteStudent', { error: error.message });
    }
});


function mainWindow() {
    createMainWindow();
    setMenu();
    initializeDatabase();
}

module.exports = { mainWindow };
