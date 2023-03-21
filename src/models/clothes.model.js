const Clothes = (sequelize, DataTypes) =>
  sequelize.define("Clothes", {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    peopleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "people", key: "id" },
    },
  });

module.exports = Clothes;
