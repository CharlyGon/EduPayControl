const studentData = {}
const {ipcRenderer} = require('electron');

function previewPhoto(input) {
    if (input?.files?.[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById('photoPreview').style.display = 'block';
            document.getElementById('photoPreview').src = e.target.result;
        }

        reader.readAsDataURL(input.files[0]); // Lee el contenido del archivo como una URL
    }
}

document.getElementById('photo').addEventListener('change', function () {
    previewPhoto(this);
});

const closeWindow = document.querySelector('.closeWindows');
closeWindow.addEventListener('click', () => {
    window.close();
});

// Capturar todos los campos de texto y select
const fields = document.querySelectorAll('input[type="text"], select');

// Iterar sobre cada campo y agregar un evento de escucha
fields.forEach(field => {
    field.addEventListener('change', () => {
        studentData[field.name] = field.value;
        console.log(studentData);
    });
});

const formStudent = document.querySelector('.formStudent ');
formStudent.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('Formulario enviado', studentData);
});

const saveButton = document.querySelector('.saveButton');
saveButton.addEventListener('click', async () => {
    try {
        ipcRenderer.send('invoke-saveStudent', studentData);
        console.log('Datos guardados',JSON.stringify(studentData));
    } catch (error) {
        console.error('Error al guardar el estudiante', error);
    }
});
