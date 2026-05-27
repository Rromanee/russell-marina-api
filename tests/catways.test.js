const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');

const User = require('../models/User');
const Catway = require('../models/Catway');

chai.use(chaiHttp);
chai.should();

describe('CATWAYS', () => {

  let token;
  let catwayId;

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

    catwayId = catway._id;

  });

  it('Get all catways', (done) => {

    chai.request(app)
      .get('/api/catways')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {

        res.should.have.status(200);

        done();

      });

  });

  it('Create catway', (done) => {

    chai.request(app)
      .post('/api/catways')
      .set('Authorization', `Bearer ${token}`)
      .send({
        catwayNumber: 99,
        type: 'long',
        catwayState: 'test'
      })
      .end((err, res) => {

        res.should.have.status(201);

        done();

      });

  });

  it('Get catway by id', (done) => {

    chai.request(app)
      .get(`/api/catways/${catwayId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {

        res.should.have.status(200);

        done();

      });

  });

  it('Update catway', (done) => {

    chai.request(app)
      .put(`/api/catways/${catwayId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        catwayState: 'Updated'
      })
      .end((err, res) => {

        res.should.have.status(200);

        done();

      });

  });

  it('Delete catway', (done) => {

    chai.request(app)
      .delete(`/api/catways/${catwayId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {

        res.should.have.status(200);

        done();

      });

  });

});