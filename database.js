const sequelize = require('./src/db/connection');

function initializeDatabase() {
    sequelize.authenticate()
        .then(() => {
            console.log('Conexión establecida correctamente.');
            // Sincronizar modelos con la base de datos
            return sequelize.sync({ alter: true });
        })
        .then(() => {
            console.log('Modelos sincronizados correctamente.');
        })
        .catch(error => {
            console.error('Error al conectar y sincronizar la base de datos:', error);
        });
}

module.exports = { initializeDatabase };
