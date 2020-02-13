const Sequelize = require("sequelize");

const connection = new Sequelize('guiapress', 'root', 'admin4infra', {
    host: 'vistodatabase',
    dialect: 'mysql'
});

module.exports = connection;