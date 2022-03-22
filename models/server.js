const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const User = require('./user');
const { dbConnection } = require('../database/config');
const { seed } = require('../database/seed');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.endPoint = {
      auth: '/api/auth',
      categories: '/api/categories',
      search: '/api/searches',
      products: '/api/products',
      uploads: '/api/uploads',
      users: '/api/users',
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
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
        createParentPath: true,
      })
    );
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
    this.app.use(this.endPoint.search, require('../routes/searches.route'));
    this.app.use(this.endPoint.uploads, require('../routes/uploads.route'));
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
