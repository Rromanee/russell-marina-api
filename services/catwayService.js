const Catway = require('../models/Catway');


// GET ALL
exports.getAllCatways = async () => {

  return await Catway.find();

};


// GET BY ID
exports.getCatwayById = async (id) => {

  return await Catway.findById(id);

};


// CREATE
exports.createCatway = async (data) => {

  const catway = new Catway(data);

  return await catway.save();

};


// UPDATE
exports.updateCatway = async (id, data) => {

  return await Catway.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );

};


// PATCH
exports.patchCatway = async (id, data) => {

  return await Catway.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );

};


// DELETE
exports.deleteCatway = async (id) => {

  return await Catway.findByIdAndDelete(id);

};