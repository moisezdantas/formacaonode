const Sequelize = require("sequelize");

const connection = new Sequelize('guiaperguntas', 'estudo', 'dev123456', {
    host: 'vistodatabase',
    dialect:'mysql',
    port:'3306'
});

module.exports = connection;