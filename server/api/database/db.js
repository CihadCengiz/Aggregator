const { Sequelize } = require('sequelize');
require('dotenv').config()


const sequelize = new Sequelize("postgres://jiaiekzoqqamwn:e36491bd97c736367fef6654ae6ecec72b958ced71ca0eda10b836b494d5845f@ec2-54-217-195-234.eu-west-1.compute.amazonaws.com:5432/d8e1j40rfmrbkj", {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
          rejectUnauthorized: false,
        }
      }
  });

module.exports = sequelize;