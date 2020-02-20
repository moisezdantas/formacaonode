const Sequelize = require("sequelize");

const connection = new Sequelize('guiapress', 'root', 'admin4infra', {
    host: 'vistodatabase',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;