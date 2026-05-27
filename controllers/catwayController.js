const catwayService = require('../services/catwayService');


// GET ALL
exports.getAllCatways = async (req, res) => {

  try {

    const catways =
      await catwayService.getAllCatways();

    res.json(catways);

  } catch (error) {

    res.status(500).json(error);
  }
};


// GET BY ID
exports.getCatwayById = async (req, res) => {

  try {

    const catway =
      await catwayService.getCatwayById(req.params.id);

    if (!catway) {

      return res.status(404).json({
        message: 'Catway introuvable'
      });
    }

    res.json(catway);

  } catch (error) {

    res.status(500).json(error);
  }
};


// CREATE
exports.createCatway = async (req, res) => {

  try {

    const catway =
      await catwayService.createCatway(req.body);

    res.status(201).json(catway);

  } catch (error) {

    res.status(500).json(error);
  }
};


// UPDATE
exports.updateCatway = async (req, res) => {

  try {

    const catway =
      await catwayService.updateCatway(
        req.params.id,
        req.body
      );

    res.json(catway);

  } catch (error) {

    res.status(500).json(error);
  }
};


// PATCH
exports.patchCatway = async (req, res) => {

  try {

    const catway =
      await catwayService.patchCatway(
        req.params.id,
        req.body
      );

    res.json(catway);

  } catch (error) {

    res.status(500).json(error);
  }
};


// DELETE
exports.deleteCatway = async (req, res) => {

  try {

    await catwayService.deleteCatway(req.params.id);

    res.json({
      message: 'Catway supprimé'
    });

  } catch (error) {

    res.status(500).json(error);
  }
};