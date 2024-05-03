import { Request, Response } from "express";
import Product from "../models/productModel";
import { AuthReq } from "../middleware/Authenticate";
import { ProductServices } from "../services/productService";

export class ProductController {
    //Create Product
  public static async createProduct(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { productName, Price, Desc } = req.body;
      const pro = await ProductServices.createProductService(
        productName,
        Price,
        Desc
      );
      res.send({ data: pro, message: "Product Created Successfully" });
    } catch (err: any) {
        res.status(500).send({ message: err.message });
    }
  }


  //Update Product
  public static async updateProduct(
    req: Request,
    res: Response
  ): Promise<void>{
    try {
    const id = req.params.id;
    const body = req.body
    const update = await ProductServices.updateProductService(id,body)
    res.send({ data: update});
    } catch (error:any) {
        res.status(500).send({ message: error.message });
    }
  }

  //Show Particular Product
  public static async showProduct(
    req: Request,
    res: Response
  ): Promise<void>{
    try {
    const id = req.params.id;
    const show = await ProductServices.showProductService(id)
    res.send({ data: show});
    } catch (error:any) {
        res.status(500).send({ message: error.message });
    }
  }

  //Show All Product
  public static async showAllProduct(
    req: Request,
    res: Response
  ): Promise<void>{
    try {
        const show = await ProductServices.showAllProductService()
        res.send({data:show})
    } catch (error:any) {
        res.status(500).send({ message: error.message });
    }
  }

  //Delete Particular Product
  public static async deleteProduct(
    req: Request,
    res: Response
  ): Promise<void>{
    try {
        const id = req.params.id;
        const del = await ProductServices.deleteProductService(id)
        res.send({data:del,message:'Product Removed Successfully'})
    } catch (error:any) {
        res.status(500).send({ message: error.message });
    }
  }

  //Delete All Products
  public static async deleteAllProduct(
    req: Request,
    res: Response
  ): Promise<void>{
    try {
        const del = await ProductServices.deleteAllProductService()
        res.send(del)
    } catch (error:any) {
        res.status(500).send({ message: error.message });
    }
  }

}
