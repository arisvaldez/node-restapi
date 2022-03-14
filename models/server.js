const express = require('express');
const cors = require('cors');

const User = require('./user');
const { dbConnection } = require('../database/config');
const { seed } = require('../database/seed');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.endPoint = {
      users: '/api/users',
      auth: '/api/auth',
      categories: '/api/categories',
      products: 'api/products',
    };

    this.connectToDb();

    this.middlewares();
    this.routes();

    //this.seed();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }

  async connectToDb() {
    await dbConnection();
  }

  routes() {
    this.app.use(this.endPoint.auth, require('../routes/auth.route'));
    this.app.use(
      this.endPoint.categories,
      require('../routes/categories.route')
    );
    this.app.use(this.endPoint.products, require('../routes/products.route'));
    this.app.use(this.endPoint.users, require('../routes/users.route'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Application running at ${this.port} port`);
    });
  }

  async seed() {
    console.log('Starting User Seeded!');
    await seed();
    console.log('Finish User Seeded!');
  }
}

module.exports = Server;
