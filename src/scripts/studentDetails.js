const { ipcRenderer } = require('electron');

function updateStudentDetails(studentDetails) {
    const studentNameElement = document.getElementById('student-name');
    studentNameElement.textContent = studentDetails.dataValues.name + ' ' + studentDetails.dataValues.lastName;

    const studentIdElement = document.getElementById('student-id');
    studentIdElement.textContent = studentDetails.dataValues.id;

    // Actualizar el contenido del HTML con los detalles del estudiante
    const studentResultsContainer = document.querySelector('.search-results');
    studentResultsContainer.innerHTML = `
        <div>
        <p>Documento: ${studentDetails.dataValues.documentNumber}</p>
        <p>Género: ${studentDetails.dataValues.sex}</p>
        <p>Dirección: ${studentDetails.dataValues.address}</p>
        <p>Teléfono: ${studentDetails.dataValues.phone}</p>
        <p>Teléfono de la madre: ${studentDetails.dataValues.motherPhone}</p>
        <p>Teléfono del padre: ${studentDetails.dataValues.fatherPhone}</p>
        <p>Teléfono del tutor: ${studentDetails.dataValues.tutorPhone}</p>
        <p>Fecha de nacimiento: ${studentDetails.dataValues.birthdate}</p>
        <p>Año escolar: ${studentDetails.dataValues.schoolYear}</p>
        <p>Sección: ${studentDetails.dataValues.section}</p>
        <p>Turno: ${studentDetails.dataValues.turn}</p>
        </div>
        `;
}

ipcRenderer.on('student-details', (event, studentDetails) => {
    updateStudentDetails(studentDetails);
});

const closeWindow = document.querySelector('.closeWindows');
closeWindow.addEventListener('click', () => {
    window.close();
});

const deleteStudent = document.querySelector('.deleteStudent');
deleteStudent.addEventListener('click', () => {
    try {
        const studentId = getStudentId();
        if (studentId) {
            // Enviar el ID del estudiante al proceso principal para eliminarlo de la base de datos
            sendDeleteRequest(studentId);
        } else {
            console.log('No se encontraron estudiantes');
        }
    } catch (error) {
        console.error('Error al eliminar el estudiante flag 1', error);
    }
});

function getStudentId() {
    const studentNameElement = document.getElementById('student-id');
    console.log("studentNameElement", studentNameElement.textContent.trim());
    if (studentNameElement) {
        // Obtener el ID del estudiante del atributo 'id' del elemento HTML
        return studentNameElement.textContent.trim();
    } else {
        console.error('No se encontraron estudiantes');
        return null;
    }
}

function sendDeleteRequest(studentId) {
    try {
        // Enviar el ID del estudiante al proceso principal para eliminarlo de la base de datos
        ipcRenderer.send('invoke-deleteStudent', { id: studentId });
        console.log('Eliminar estudiante:', studentId);
    } catch (error) {
        console.error('Error al eliminar el estudiante:', error);
    }
}

ipcRenderer.on('close-studentDetailsWindow', () => {
    // Cerrar la ventana studentDetailsWindow
    window.close();
});
