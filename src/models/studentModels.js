const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Student = sequelize.define('Student', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    documentNumber: {
        type: DataTypes.STRING
    },
    sex: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    motherPhone: {
        type: DataTypes.STRING
    },
    fatherPhone: {
        type: DataTypes.STRING
    },
    tutorPhone: {
        type: DataTypes.STRING
    },
    birthdate: {
        type: DataTypes.STRING
    },
    schoolYear: {
        type: DataTypes.STRING
    },
    section: {
        type: DataTypes.STRING
    },
    turn: {
        type: DataTypes.STRING
    }
});

module.exports = { Student };
