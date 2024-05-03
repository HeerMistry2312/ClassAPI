import { UserController } from "../controllers/userControl";
import express from "express";
import { AuthMiddleware } from "../middleware/Authenticate";
export class UserRouter {
  private router: express.Router;

  constructor() {
    this.router = express.Router();
    this.configureRoutes();
  }

  private configureRoutes(): void {
    this.router.post("/signUp", UserController.signUpUser);
    this.router.post("/login", UserController.loginUser);
    this.router.get(
      "/logout",
      AuthMiddleware.authUser,
      UserController.logoutUser
    );
    this.router.delete(
      "/remove",
      AuthMiddleware.authUser,
      UserController.removeUser
    );
    this.router.patch(
      "/edit",
      AuthMiddleware.authUser,
      UserController.editUser
    );
  }
  public getRouter(): express.Router {
    return this.router;
  }
}
