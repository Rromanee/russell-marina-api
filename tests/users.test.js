const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');

const User = require('../models/User');

chai.use(chaiHttp);
chai.should();

describe('USERS', () => {

  let token;
  let userId;

  before(async () => {

    await User.deleteMany({ email: 'admin@test.com' });

    const admin = await User.create({
      name: 'Admin',
      email: 'admin@test.com',
      password: 'admin'
    });

    userId = admin._id;

    const login = await chai.request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@test.com',
        password: 'admin'
      });

    token = login.body.token;

    console.log(login.body);

  });

  it('Create user', (done) => {

    chai.request(app)
      .post('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test',
        email: `test${Date.now()}@test.com`,
        password: '1234'
      })
      .end((err, res) => {

        res.should.have.status(201);

        done();

      });

  });

  it('Update user', (done) => {

    chai.request(app)
      .put(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated User'
      })
      .end((err, res) => {

        res.should.have.status(200);

        done();

      });

  });

  it('Delete user', (done) => {

    chai.request(app)
      .delete(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {

        res.should.have.status(200);

        done();

      });

  });

});