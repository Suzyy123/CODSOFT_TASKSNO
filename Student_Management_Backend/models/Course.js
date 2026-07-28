const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Course = sequelize.define(
    "Course",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        course_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "courses",
        timestamps: false,
    }
);

module.exports = Course;