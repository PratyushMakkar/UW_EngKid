const { Sequelize } = require('sequelize');
const {username, password, database, host_} = require("../config.json")

const sequelize = new Sequelize(
    database,
    username,
    password,
    {
        host: host_,
        dialect: 'postgres'
    }
)

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}


