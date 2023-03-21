const e = require("express");
const express = require("express");

const { clothesCollection } = require("../models/index.js");

const clothesRouter = express.Router();
//add routes
clothesRouter.get("/clothes", getClothes);
clothesRouter.get("/clothes/:id", getOneClothes);
clothesRouter.post("/clothes", createClothes);
clothesRouter.put("/clothes/:id", updateClothes);
clothesRouter.delete("/clothes/:id", deleteClothes);

async function getClothes(req, res) {
  const allClothes = await clothesCollection.getAll();
  res.status(200).json(allClothes);
}
async function getOneClothes(req, res) {
  const clothesId = parseInt(req.params.id);
  let clothes = await clothesCollection.getById(clothesId);
  res.status(200).json(clothes);
}

async function createClothes(req, res) {
  let newClothes = req.body;
  let clothes = await clothesCollection.create(newClothes);
  res.status(201).json(clothes);
}

async function updateClothes(req, res) {
  let clothesId = parseInt(req.params.id);
  let updateClothes = req.body;
  //TODO (DONE) refactor it
  let foundClothes = await clothesCollection.getById(clothesId);
  if (foundClothes) {
    let updatedClothes = await foundClothes.update(updateClothes);
    res.status(201).json(updatedClothes);
  } else {
    res.status(404);
  }
}
async function deleteClothes(req, res) {
  let clothesId = parseInt(req.params.id);
  try {
    let deleteClothes = await clothesCollection.delete(clothesId);
    res.status(204).json(deleteClothes);
  } catch (error) {
    res.status(500);
  }
}

module.exports = clothesRouter;
