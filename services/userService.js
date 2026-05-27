const User = require('../models/User');


// GET ALL
exports.getAllUsers = async () => {

  return await User.find();

};


// GET BY ID
exports.getUserById = async (id) => {

  return await User.findById(id);

};


// CREATE
exports.createUser = async (data) => {

  const user = new User(data);

  return await user.save();

};


// UPDATE
exports.updateUser = async (id, data) => {

  return await User.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );

};


// DELETE
exports.deleteUser = async (id) => {

  return await User.findByIdAndDelete(id);

};