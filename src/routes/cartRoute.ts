import express from "express";
import { AuthMiddleware } from "../middleware/Authenticate";
import { CartController } from "../controllers/cartControl";

export class CartRouter {
  private router: express.Router;

  constructor() {
    this.router = express.Router();
    this.configureRoutes();
  }

  private configureRoutes(): void {
    this.router.get("/", AuthMiddleware.authProfile, CartController.goToCart);
    this.router.post(
      "/add",
      AuthMiddleware.authProfile,
      CartController.addToCart
    );
    this.router.get(
      "/remove",
      AuthMiddleware.authProfile,
      CartController.decrementByOneCart
    );
    this.router.get(
      "/empty",
      AuthMiddleware.authProfile,
      CartController.EmptyCart
    );
    this.router.get(
      "/download",
      AuthMiddleware.authProfile,
      CartController.DownloadPDF
    );
  }
  public getRouter(): express.Router {
    return this.router;
  }
}
