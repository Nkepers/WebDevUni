const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Question extends Model { };

Question.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        language: {
            type: DataTypes.STRING,
        }
    },
    {
        sequelize,
        modelName: 'question'
    }
);

module.exports = Question;