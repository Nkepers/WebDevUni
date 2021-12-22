const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Body extends Model { };

Body.init(
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
        }
    },
    {
        sequelize,
        modelName: 'body'
    }
);

module.exports = Body;