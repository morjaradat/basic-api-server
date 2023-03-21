const People = (sequelize, DataTypes) =>
  sequelize.define("people", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

module.exports = People;
