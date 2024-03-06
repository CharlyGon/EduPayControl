const { ipcRenderer } = require('electron');

const closeWindow = document.querySelector('.closeWindows');
closeWindow.addEventListener('click', () => {
    window.close();
});

const searchStudents = document.querySelector('.searchButton');
searchStudents.addEventListener('click', () => {
    try {
        // Obtener el término de búsqueda ingresado por el usuario
        const searchTerm = document.getElementById('searchInput').value;

        // Enviar los datos al proceso principal para realizar la búsqueda
        ipcRenderer.send('invoke-findStudents', {
            searchTerm: searchTerm
        });

        console.log('Buscando estudiantes', searchTerm);
    } catch (error) {
        console.error('Error al buscar estudiantes', error);
    }
});

ipcRenderer.on('response-findStudents', (event, students) => {
    const resultsContainer = document.querySelector('.search-results');

    // Limpiar el contenedor de resultados antes de agregar nuevos resultados
    resultsContainer.innerHTML = '';

    // Verificar si se recibieron datos válidos
    if (students && students.length > 0) {
        // Iterar sobre los estudiantes y agregarlos al contenedor de resultados
        students.forEach(student => {
            // Crear un nuevo elemento <div> para cada estudiante
            const studentElement = document.createElement('div');
            studentElement.classList.add('student-item');

            // Establecer el contenido del elemento con el nombre y el apellido del estudiante
            studentElement.innerHTML = `
                <p class="student-name">${student.dataValues.name} ${student.dataValues.lastName}</p>
                <div class="student-details" style="display: none;">
                    <p>Género: ${student.dataValues.sex}</p>
                    <p>Dirección: ${student.dataValues.address}</p>
                    <p>Teléfono: ${student.dataValues.phone}</p>
                    <p>Teléfono de la madre: ${student.dataValues.motherPhone}</p>
                    <p>Teléfono del padre: ${student.dataValues.fatherPhone}</p>
                    <p>Teléfono del tutor: ${student.dataValues.tutorPhone}</p>
                    <p>Fecha de nacimiento: ${student.dataValues.birthdate}</p>
                    <p>Año escolar: ${student.dataValues.schoolYear}</p>
                    <p>Sección: ${student.dataValues.section}</p>
                    <p>Turno: ${student.dataValues.turn}</p>
                </div>
            `;

            const studentName = studentElement.querySelector('.student-name');
            studentName.addEventListener('click', () => {
                const studentDetails = studentElement.querySelector('.student-details');
                if (studentDetails.style.display === 'none') {
                    studentDetails.style.display = 'block';
                } else {
                    studentDetails.style.display = 'none';
                }
            });

            resultsContainer.appendChild(studentElement);
        });
    } else {
        resultsContainer.textContent = 'No se encontraron estudiantes.';
    }
});
