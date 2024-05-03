import express from 'express';
import { AuthMiddleware } from "../middleware/Authenticate";
import { ProductController } from '../controllers/productControl';

export class ProductRouter{
    private router: express.Router;

  constructor() {
    this.router = express.Router();
    this.configureRoutes();
  }

  private configureRoutes(): void {
    this.router.post('/create',ProductController.createProduct)
    this.router.patch('/update/:id',ProductController.updateProduct)
    this.router.get('/showProduct/:id',ProductController.showProduct)
    this.router.get('/showAll',ProductController.showAllProduct)
    this.router.delete('/deleteProduct/:id',ProductController.deleteProduct)
    this.router.delete('/deleteAll',ProductController.deleteAllProduct)
  }
  public getRouter(): express.Router {
    return this.router;
  }
}
