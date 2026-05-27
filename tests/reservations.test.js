const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');

const User = require('../models/User');
const Catway = require('../models/Catway');
const Reservation = require('../models/Reservation');

chai.use(chaiHttp);
chai.should();

describe('RESERVATIONS', () => {

  let token;
  let catwayId;
  let reservationId;

  before(async () => {

    await User.deleteMany({ email: 'admin@test.com' });

    await User.create({
      name: 'Admin',
      email: 'admin@test.com',
      password: 'admin'
    });

    const login = await chai.request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@test.com',
        password: 'admin'
      });

    token = login.body.token;

    await Catway.deleteMany({});

    const catway = await Catway.create({
      catwayNumber: 1,
      type: 'long',
      catwayState: 'available'
    });

    catwayId = catway.catwayNumber;

    const reservation = await Reservation.create({
      catwayNumber: 1,
      clientName: 'Test',
      boatName: 'Boat',
      checkIn: '2026-05-26',
      checkOut: '2026-05-30'
    });

    reservationId = reservation._id;

  });

  it('Get reservations', (done) => {

    chai.request(app)
      .get(`/api/catways/${catwayId}/reservations`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {

        res.should.have.status(200);

        done();

      });

  });

  it('Create reservation', (done) => {

    chai.request(app)
      .post(`/api/catways/${catwayId}/reservations`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        clientName: 'Test',
        boatName: 'Boat',
        checkIn: '2026-05-26',
        checkOut: '2026-05-30'
      })
      .end((err, res) => {

        res.should.have.status(201);

        done();

      });

  });

  it('Get reservation by id', (done) => {

    chai.request(app)
      .get(`/api/catways/${catwayId}/reservations/${reservationId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {

        res.should.have.status(200);

        done();

      });

  });

  it('Delete reservation', (done) => {

    chai.request(app)
      .delete(`/api/catways/${catwayId}/reservations/${reservationId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {

        res.should.have.status(200);

        done();

      });

  });

});