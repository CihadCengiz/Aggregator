const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

class Volunteers extends Model {}

Volunteers.init(
  {
    title: {
      type: DataTypes.STRING,
    },
    company: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    duration: {
      type: DataTypes.STRING,
    },
    period: {
      type: DataTypes.STRING,
    },
    postdate: {
      type: DataTypes.DATE,
    },
    redirect: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "volunteers",
    timestamps: false,
  }
);

module.exports = Volunteers;
