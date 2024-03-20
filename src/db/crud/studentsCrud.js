const { Student } = require('../../models/studentModels.js');
const { Op } = require('sequelize');

async function saveStudent(studentData) {
    try {
        const student = await Student.create(studentData);
        return student;
    } catch (error) {
        throw new Error('Error al guardar el estudiante en la base de datos: ' + error.message);
    }
}

async function getAllStudents() {
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

async function getStudents(criteria) {
    try {
        // Construye el objeto de búsqueda basado en los criterios proporcionados
        const searchCriteria = {};

        if (criteria.searchTerm) {
            // Verificar si el término de búsqueda contiene un espacio
            const searchTerms = criteria.searchTerm.split(' ');

            if (searchTerms.length > 1) {
                // Si contiene un espacio, buscar coincidencia exacta de nombre y apellido
                searchCriteria[Op.and] = [
                    { name: { [Op.like]: `%${searchTerms[0]}%` } },
                    { lastName: { [Op.like]: `%${searchTerms[1]}%` } }
                ];
            } else {
                // Si no contiene un espacio, buscar por nombre, apellido y número de documento
                searchCriteria[Op.or] = [
                    { name: { [Op.like]: `%${criteria.searchTerm}%` } },
                    { lastName: { [Op.like]: `%${criteria.searchTerm}%` } },
                    { documentNumber: { [Op.like]: `%${criteria.searchTerm}%` } }
                ];
            }
        }

        // Realiza la búsqueda utilizando los criterios
        const students = await Student.findAll({
            where: searchCriteria
        });

        console.log("students", students);
        return students;
    } catch (error) {
        throw new Error('Error al obtener los estudiantes de la base de datos: ' + error.message);
    }
}

async function deleteStudent(idStudent) {
    try {
        const student = await Student.findByPk(idStudent);
        const studentDeleted = await student.destroy();
        console.log(" Estudiante eliminado", studentDeleted)
        return true;
    } catch (error) {
        throw new Error('Error al eliminar el estudiante de la base de datos: ' + error.message);
    }
}

module.exports = { saveStudent, getStudents, getStudentById, deleteStudent, getAllStudents};
