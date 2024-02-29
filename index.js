'use strict';
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const { setMenu } = require('./src/menu/menuTemplate');
const sequelize = require('./src/db/connection');

if (process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    });
}

let mainWindow;
app.on('ready', async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión establecida correctamente.');

        // Sincronizar modelos con la base de datos
        await sequelize.sync({ alter: true });
        console.log('Modelos sincronizados correctamente.');

        // Crear la ventana principal
        mainWindow = new BrowserWindow({ width: 800, height: 600 });
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'src', 'views', 'index.html'),
            protocol: 'file:',
            slashes: true
        }));

        // Establecer el menú
        setMenu();
    } catch (error) {
        console.error('Error al conectar y sincronizar la base de datos:', error);
    }
});
