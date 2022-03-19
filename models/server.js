import express, { json, static } from "express";
import cors from "cors";

import User from "./user";
import { dbConnection } from "../database/config";
import { seed } from "../database/seed";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.endPoint = {
      users: "/api/users",
      auth: "/api/auth",
      categories: "/api/categories",
      products: "api/products",
    };

    this.connectToDb();

    this.middlewares();
    this.routes();

    //this.seed();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(static("public"));
  }

  async connectToDb() {
    await dbConnection();
  }

  routes() {
    this.app.use(this.endPoint.auth, require("../routes/auth.route").default);
    this.app.use(
      this.endPoint.categories,
      require("../routes/categories.route").default
    );
    this.app.use(
      this.endPoint.products,
      require("../routes/products.route").default
    );
    this.app.use(this.endPoint.users, require("../routes/users.route").default);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Application running at ${this.port} port`);
    });
  }

  async seed() {
    console.log("Starting User Seeded!");
    await seed();
    console.log("Finish User Seeded!");
  }
}

export default Server;
