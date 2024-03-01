const { Student } = require('../../models/studentModels.js');

async function saveStudent(studentData) {
    try {
        const student = await Student.create(studentData);
        return student;
    } catch (error) {
        throw new Error('Error al guardar el estudiante: ' + error.message);
    }
}

module.exports = { saveStudent }; // Asegúrate de exportar la función correctamente
