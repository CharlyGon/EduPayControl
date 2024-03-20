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
            `;

            // Añadir el ID del estudiante como dataset
            studentElement.dataset.studentId = student.dataValues.id;

            // Agregar evento de clic para mostrar los detalles del estudiante
            studentElement.addEventListener('click', () => {
                const studentId = studentElement.dataset.studentId;
                ipcRenderer.send('show-student-details', studentId);
            });

            resultsContainer.appendChild(studentElement);
        });
    } else {
        resultsContainer.textContent = 'No se encontraron estudiantes.';
    }
});
