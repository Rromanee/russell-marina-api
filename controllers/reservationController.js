const reservationService = require('../services/reservationService');


// GET ALL reservations d’un catway
exports.getReservations = async (req, res) => {

  try {

    const reservations =
      await reservationService.getReservations(req.params.id);

    res.json(reservations);

  } catch (error) {

    res.status(500).json(error);
  }
};


// GET ONE reservation
exports.getReservationById = async (req, res) => {

  try {

    const reservation =
      await reservationService.getReservationById(
        req.params.idReservation
      );

    if (!reservation) {

      return res.status(404).json({
        message: 'Réservation introuvable'
      });
    }

    res.json(reservation);

  } catch (error) {

    res.status(500).json(error);
  }
};


// CREATE reservation
exports.createReservation = async (req, res) => {

  try {

    const reservation =
      await reservationService.createReservation(
        req.body,
        req.params.id
      );

    res.status(201).json(reservation);

  } catch (error) {

    res.status(500).json(error);
  }
};


// DELETE reservation
exports.deleteReservation = async (req, res) => {

  try {

    await reservationService.deleteReservation(
      req.params.idReservation
    );

    res.json({
      message: 'Réservation supprimée'
    });

  } catch (error) {

    res.status(500).json(error);
  }
};