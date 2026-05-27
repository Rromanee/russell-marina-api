require('dotenv').config();

const mongoose = require('mongoose');

const Catway = require('./models/Catway');
const Reservation = require('./models/Reservation');

const catways = require('./data/catways.json');
const reservations = require('./data/reservations.json');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {

    console.log('MongoDB connected');

    // vider anciennes données
    await Catway.deleteMany();
    await Reservation.deleteMany();

    // importer
    await Catway.insertMany(catways);
    await Reservation.insertMany(reservations);

    console.log('Données importées');

    process.exit();

  })
  .catch((error) => {
    console.log(error);
  });