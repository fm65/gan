'use strict';
module.exports = (sequelize, DataTypes) => {
  const Flight = sequelize.define('Flight', {
    city: DataTypes.STRING,
    departure: DataTypes.STRING,
    arrival: DataTypes.STRING,
    departureDate: DataTypes.DATE,
    arrivalDate: DataTypes.DATE,
    published: DataTypes.BOOLEAN
    }, {});
  Flight.associate = function(models) {
    Flight.hasMany(models.Plane);
    Flight.belongsToMany(models.Passenger, {through: 'FlightPassengers'});
  };
  return Flight;
};