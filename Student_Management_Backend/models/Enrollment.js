const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Enrollment = sequelize.define(
    "Enrollment",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        student_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        course_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "enrollments",
        timestamps: false,
    }
);

module.exports = Enrollment;