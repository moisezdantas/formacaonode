const Sequelize = require("sequelize");
const connection = require("./database");

const Games = connection.define('game',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    year:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price:{
        type: Sequelize.FLOAT,
        allowNull: false
    }
});

module.exports = Games;