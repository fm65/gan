'use strict';
module.exports = (sequelize, DataTypes) => {
  const Destination = sequelize.define('Destination', {
    city: DataTypes.STRING,
    airport: DataTypes.STRING
  }, {});
  Destination.associate = function(models) {
    Destination.hasMany(models.Flight);
  };
  return Destination;
};