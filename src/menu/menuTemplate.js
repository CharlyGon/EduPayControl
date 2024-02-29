const { Menu } = require('electron');
const { createStudentsWindow } = require('../windows/createStudentWindows');
const { quitApp } = require('../windows/quitAppWindows');

const templateMenu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New Student',
                accelerator: 'Ctrl+N',
                click() {
                    createStudentsWindow();
                }
            },{
                label: 'Exit',
                accelerator: 'Ctrl+Q',
                click() {
                 quitApp();
                }
            }
        ]
    },
];

const setMenu = () => {
    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);
};

module.exports = { setMenu };
