const express = require("express");

//in this line we are taking the routing functionality from express

const { peopleCollection } = require("../models/index.js");

const peopleRouter = express.Router();
//add routes
peopleRouter.get("/people", getPeople);
peopleRouter.get("/people/:id", getOnePeople);
peopleRouter.post("/people", createPeople);
peopleRouter.put("/people/:id", updatePeople);
peopleRouter.delete("/people/:id", deletePeople);

async function getPeople(req, res) {
  const allPeople = await peopleCollection.getAll();
  res.status(200).json(allPeople);
}
async function getOnePeople(req, res) {
  const peopleId = parseInt(req.params.id);
  let people = await peopleCollection.getById(peopleId);
  res.status(200).json(people);
}

async function createPeople(req, res) {
  let newPeople = req.body;
  let people = await peopleCollection.create(newPeople);
  res.status(201).json(people);
}

async function updatePeople(req, res) {
  let peopleId = parseInt(req.params.id);
  let updatePeople = req.body;
  let foundPeople = await peopleCollection.getById(peopleId);
  if (foundPeople) {
    let updatedPeople = await foundPeople.update(updatePeople);
    res.status(201).json(updatedPeople);
  } else {
    res.status(404);
  }
  // try {
  //   let foundPeople = await peopleCollection.update(peopleId, updatePeople);
  //   res.status(201).json(foundPeople);
  // } catch (error) {
  //   res.status(500);
  // }
}
async function deletePeople(req, res) {
  //just make sure to parse it into int because it will be a number but in string format
  let peopleId = parseInt(req.params.id);
  try {
    let deletePeople = await peopleCollection.delete(peopleId);
    //if we have the name id instead of peopleId we can use a short cut
    //   let deletePeople = await people.destroy({ where: { id } });
    res.status(204).json(deletePeople); //it will return the id of the deleted person
  } catch (error) {
    res.status(500);
  }
}

module.exports = peopleRouter;
