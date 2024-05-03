import express from "express";
import { AuthMiddleware } from "../middleware/Authenticate";
import { ProfileController } from "../controllers/profileControl";
export class ProfileRouter {
  private router: express.Router;

  constructor() {
    this.router = express.Router();
    this.configureRoutes();
  }

  private configureRoutes(): void {
    this.router.post(
      "/create",
      AuthMiddleware.authUser,
      ProfileController.createProfile
    );
    this.router.get(
      "/getProfile/:id",
      AuthMiddleware.authUser,
      ProfileController.selectProfile
    );
    this.router.get(
      "/",
      AuthMiddleware.authUser,
      ProfileController.showProfiles
    );
    this.router.delete(
      "/deleteProfile",
      AuthMiddleware.authProfile,
      ProfileController.DeleteOneProfile
    );
    this.router.delete(
      "/deleteAll",
      AuthMiddleware.authUser,
      ProfileController.DeleteAllProfile
    );
    this.router.patch(
      "/editProfile",
      AuthMiddleware.authProfile,
      ProfileController.EditProfile
    );
  }
  public getRouter(): express.Router {
    return this.router;
  }
}
