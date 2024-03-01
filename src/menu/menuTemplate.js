const { Menu } = require('electron');
const { createStudentsWindow } = require('../windows/createStudentWindows');
const { quitApp } = require('../windows/quitAppWindows');
const { findStudents } = require('../windows/findStudentsWindow');

const templateMenu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Exit',
                accelerator: 'Ctrl+Q',
                click() {
                 quitApp();
                }
            }
        ]
    },{
        label: 'Users',
        submenu: [
            {
                label: 'New Student',
                accelerator: 'Ctrl+N',
                click() {
                    createStudentsWindow();
                }
            },
            {
                label:'Find Students',
                accelerator: 'Ctrl+F',
                click() {
                    findStudents();
                }
            }
        ]
    },{
        label: 'View',
        submenu: [
            {
                label: 'toggledevtools',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    }
];

const setMenu = () => {
    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);
};

module.exports = { setMenu };
