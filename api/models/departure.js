'use strict';
module.exports = (sequelize, DataTypes) => {
  const Departure = sequelize.define('Departure', {
    city: DataTypes.STRING,
    airport: DataTypes.STRING
  }, {});
  Departure.associate = function(models) {
    Departure.hasMany(models.Flight);
  };
  return Departure;
};