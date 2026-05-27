require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/database');

const app = express();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const catwayRoutes = require('./routes/catwayRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const Catway = require('./models/Catway');
const Reservation = require('./models/Reservation');

const swaggerUi = require('swagger-ui-express');

const swaggerSpecs = require('./docs/swagger');

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

// DASHBOARD
app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

// CATWAYS
app.get('/catways', async (req, res) => {

  const catways = await Catway.find();

  res.render('catways', {
    catways
  });

});

// RESERVATIONS
app.get('/reservations', async (req, res) => {

  const reservations = await Reservation.find();

  res.render('reservations', {
    reservations
  });

});

// DETAIL CATWAY
app.get('/catway/:id', async (req, res) => {

  const catway = await Catway.findById(req.params.id);

  res.render('catway', {
    catway
  });

});

// DETAIL RESERVATION
app.get('/reservation/:id', async (req, res) => {

  const reservation = await Reservation.findById(req.params.id);

  res.render('reservation', {
    reservation
  });

});

app.use(
 '/docs',
  swaggerUi.serve,
 swaggerUi.setup(swaggerSpecs)
);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/catways', catwayRoutes);
app.use('/api/catways/:id/reservations', reservationRoutes);
app.use('/api/catways/reservation', reservationRoutes);

module.exports = app;