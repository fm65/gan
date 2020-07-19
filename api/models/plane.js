'use strict';
module.exports = (sequelize, DataTypes) => {
  const Plane = sequelize.define('Plane', {
    name: DataTypes.STRING,
    place: DataTypes.INTEGER
  }, {});
  Plane.associate = function(models) {
  	Plane.hasMany(models.Flight);
    Plane.belongsToMany(models.Classe, {through: 'PlaneClasses'});
  };
  return Plane;
};
