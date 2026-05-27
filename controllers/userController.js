const userService = require('../services/userService');


// GET ALL USERS
exports.getAllUsers = async (req, res) => {

  try {

    const users = await userService.getAllUsers();

    res.json(users);

  } catch (error) {

    res.status(500).json(error);

  }

};


// GET USER BY ID
exports.getUserById = async (req, res) => {

  try {

    const user = await userService.getUserById(req.params.id);

    res.json(user);

  } catch (error) {

    res.status(500).json(error);

  }

};


// CREATE USER
exports.createUser = async (req, res) => {

  try {

    const user = await userService.createUser(req.body);

    res.status(201).json(user);

  } catch (error) {

    res.status(500).json(error);

  }

};


// UPDATE USER
exports.updateUser = async (req, res) => {

  try {

    const user = await userService.updateUser(
      req.params.id,
      req.body
    );

    res.json(user);

  } catch (error) {

    res.status(500).json(error);

  }

};


// DELETE USER
exports.deleteUser = async (req, res) => {

  try {

    await userService.deleteUser(req.params.id);

    res.json({
      message: 'Utilisateur supprimé'
    });

  } catch (error) {

    res.status(500).json(error);

  }

};