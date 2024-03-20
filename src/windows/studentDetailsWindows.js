const { BrowserWindow, ipcRenderer } = require('electron');
const path = require('path');
const url = require('url');

let studentDetailsWindow;

function studentWindow(studentDetails) {
    studentDetailsWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    });

    studentDetailsWindow.loadURL(url.format({
        pathname: path.join(__dirname, '..', 'views', 'studentDetails.html'),
        protocol: 'file:',
        slashes: true
    }));

    studentDetailsWindow.webContents.on('did-finish-load', () => {
        try {
            console.log('Mostrar detalles del estudiante: Renderer', studentDetails);
            // Enviar los detalles del estudiante al proceso de renderizado de la ventana
            studentDetailsWindow.webContents.send('student-details', studentDetails);
        } catch (error) {
            console.error('Error al enviar los detalles del estudiante:', error);
        }
    });

    // Manejar el cierre de la ventana
    studentDetailsWindow.on('closed', () => {
        studentDetailsWindow = null;
    });
}

module.exports = { studentWindow };
