import express from "express";
import Database from "./config/db";
import { UserRouter } from "./routes/userRoute";
import { ProfileRouter } from "./routes/profileRoute";
import { ProductRouter } from "./routes/productRoute";
import { CartRouter } from "./routes/cartRoute";
export class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.connectDB();
    this.routes();
  }

  private config(): void {
    this.app.use(express.json());
  }
  private connectDB(): void {
    new Database();
  }
  private routes(): void {
    const userRoute = new UserRouter().getRouter();
    const profileRoute = new ProfileRouter().getRouter();
    const productRoute = new ProductRouter().getRouter();
    const cartRoute = new CartRouter().getRouter();
    this.app.use("/user", userRoute);
    this.app.use("/profile", profileRoute);
    this.app.use("/product", productRoute);
    this.app.use("/cart", cartRoute);
  }
  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  }
}
