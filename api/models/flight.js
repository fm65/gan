'use strict';
module.exports = (sequelize, DataTypes) => {
  const Flight = sequelize.define('Flight', {
    departureDate: DataTypes.DATE,
    arrivalDate: DataTypes.DATE
  }, {});
  Flight.associate = function(models) {
    Flight.hasMany(models.Plane);
    Flight.belongsTo(models.Departure);
    Flight.belongsTo(models.Destination);
    Flight.belongsToMany(models.Passenger, {through: 'FlightPassengers'});
  };
  return Flight;
};