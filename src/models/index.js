require("dotenv").config();

const POSTGRES_URI =
  process.env.NODE_ENV === "test" ? "sqlite:memory:" : process.env.DATABASE_URL;

const { Sequelize, DataTypes } = require("sequelize");

// this is option for heroku or railway for ssl just in production (is for security)
let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

const People = require("./people.model");
const Clothes = require("./clothes.model");
const Collection = require("./lib/collection");

//! this is wrong (not working )
// const peopleCollection = new Collection(people);
// const clothesCollection = new Collection(Clothes);
const peopleTable = People(sequelize, DataTypes);
const clothesTable = Clothes(sequelize, DataTypes);

const peopleCollection = new Collection(People(sequelize, DataTypes));
const clothesCollection = new Collection(Clothes(sequelize, DataTypes));

// example usage:
// peopleCollection.create({ name: "Pizza", cost: 10 });
// peopleCollection.create({ name: "banana", cost: 3 });
// peopleCollection.create({ name: "mansaf", cost: 49.99 });

// clothesCollection.create({ type: "T-Shirt", color: "blue", cost: 12 });
// clothesCollection.create({ type: "T-Shirt", color: "red", cost: 10 });
// clothesCollection.create({ type: "T-Shirt", color: "black", cost: 13.5 });

// clothesCollection.getById(1);
// clothesCollection.update(2, { name: "T-Shirt", cost: 9.99 });
// peopleCollection.delete(3);

// tables connection relation
peopleTable.hasMany(clothesTable, {
  foreignKey: "peopleId",
});

clothesTable.belongsTo(peopleTable);

async function ConnectionTest() {
  try {
    await sequelize.authenticate();
    console.log("------Connection has been established successfully.---------");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = {
  db: sequelize,
  ConnectionTest: ConnectionTest,
  People: People(sequelize, DataTypes),
  Clothes: Clothes(sequelize, DataTypes),
  peopleCollection: peopleCollection,
  clothesCollection: clothesCollection,
};
