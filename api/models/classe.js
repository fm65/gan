'use strict';
module.exports = (sequelize, DataTypes) => {
  const Classe = sequelize.define('Classe', {
    type: DataTypes.ENUM('economy', 'business', 'first')
  }, {});
  Classe.associate = function(models) {
    Classe.belongsToMany(models.Plane, {through: 'PlaneClasses'});
  };
  return Classe;
};