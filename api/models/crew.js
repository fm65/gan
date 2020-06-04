'use strict';
module.exports = (sequelize, DataTypes) => {
  const Crew = sequelize.define('Crew', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    post: DataTypes.STRING
  }, {});
  Crew.associate = function(models) {
    Crew.belongsTo(models.Company);
  };
  return Crew;
};