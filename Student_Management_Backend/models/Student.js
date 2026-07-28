const {DataTypes} = require("sequelize"); //importing datatypes from sequelize
const sequelize = require("../config/database");
const Student = sequelize.define(
    "Student",
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        age:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    },
    {
        tableName: "students",
        timestamps: false
    }
);
module.exports = Student;