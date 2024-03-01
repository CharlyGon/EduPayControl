const studentData = {}

const { remote } = require('electron');
remote.require("../../index")
saveDB.saveStudentToDB();

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
        console.log('Datos guardados');
        console.log(JSON.stringify(studentData));
        //const student = await saveStudent(studentData);
        console.log('estudiante guardado en la base de datos', student);
    } catch (error) {
        console.error('Error al guardar el estudiante', error);
    }
});
