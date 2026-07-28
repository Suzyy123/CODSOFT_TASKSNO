const {Sequelize} = require("sequelize"); //importing basically
//loading variable from dotenv
require("dotenv").config();
//creating connection object
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        port: process.env.DB_PORT,
        logging: false,

    }
   
)
module.exports = sequelize;