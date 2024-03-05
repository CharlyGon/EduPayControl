const { Student } = require('../../models/studentModels.js');

async function saveStudent(studentData) {
    try {
        const student = await Student.create(studentData);
        return student;
    } catch (error) {
        throw new Error('Error al guardar el estudiante en la base de datos: ' + error.message);
    }
}

async function getStudents() {
    try {
        const students = await Student.findAll();
        return students;
    } catch (error) {
        throw new Error('Error al obtener los estudiantes de la base de datos: ' + error.message);
    }
}

async function getStudentById(id) {
    try {
        const student = await Student.findByPk(id);
        return student;
    } catch (error) {
        throw new Error('Error al obtener el estudiante de la base de datos: ' + error.message);
    }
}

module.exports = { saveStudent, getStudents };
