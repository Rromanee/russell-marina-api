const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');

const User = require('../models/User');

chai.use(chaiHttp);
chai.should();

describe('AUTH', function () {

  this.timeout(10000);

  before(async () => {

    await User.deleteMany({ email: 'admin@test.com' });

    await User.create({
      name: 'Admin',
      email: 'admin@test.com',
      password: 'admin'
    });

  });

  it('Login OK', (done) => {

    chai.request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@test.com',
        password: 'admin'
      })
      .end((err, res) => {

        res.should.have.status(200);

        done();

      });

  });

});