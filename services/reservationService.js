const Reservation = require('../models/Reservation');


// GET ALL
exports.getReservations = async (catwayId) => {

  return await Reservation.find({
    catwayNumber: catwayId
  });

};


// GET ONE
exports.getReservationById = async (id) => {

  return await Reservation.findById(id);

};


// CREATE
exports.createReservation = async (data, catwayId) => {

  const reservation = new Reservation({
    ...data,
    catwayNumber: catwayId
  });

  return await reservation.save();

};


// DELETE
exports.deleteReservation = async (id) => {

  return await Reservation.findByIdAndDelete(id);

};