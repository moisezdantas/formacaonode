const Sequelize = require("sequelize");

const connection = new Sequelize('game', 'root', 'admin4infra', {
    host: 'vistodatabase',
    dialect:'mysql',
    port:'3306'
});

module.exports = connection;