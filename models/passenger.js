'use strict';
module.exports = (sequelize, DataTypes) => {
  const Passenger = sequelize.define('Passenger', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    pc: DataTypes.INTEGER,
    birthDate: DataTypes.DATE
  }, {});
  Passenger.associate = function(models) {
    Passenger.belongsToMany(models.User, {through: 'UserPassengers'});
    Passenger.belongsToMany(models.Flight, {through: 'FlightPassengers'});
  };
  return Passenger;
};