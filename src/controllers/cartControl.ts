import { Request, Response } from "express";
import { CartServices } from "../services/cartService";
import Cart from "../models/cartModel";
import { AuthReq } from "../middleware/Authenticate";
import fs from "fs";
import { Types } from "mongoose";
export class CartController {
  //Goto Cart
  public static async goToCart(req: Request, res: Response): Promise<void> {
    try {
      const uid = (req as AuthReq).userId?.toString();
      const pid = (req as AuthReq).profileId?.toString();
      const cart = await CartServices.gotoCartService(uid, pid);
      res.send(cart);
    } catch (error: any) {
      res
        .status(500)
        .send({ message: error.message || "Error fetching profile" });
    }
  }

  //AddTo Cart
  public static async addToCart(req: Request, res: Response): Promise<void> {
    try {
      const uid = (req as AuthReq).userId?.toString();
      const pid = (req as AuthReq).profileId?.toString();
      const product = new Types.ObjectId(req.body.product);
      const quantity = req.body.quantity;
console.log(product)
      let cart = await CartServices.addtoCartService(
        uid,
        pid,
        product,
        quantity
      );
      res.send({ data: cart });
    } catch (error: any) {
      res.status(500).send({ message: "Error adding item to cart" });
    }
  }

  //Decrement Item By One
  public static async decrementByOneCart(req: Request, res: Response): Promise<void>{
    try {
        const uid = (req as AuthReq).userId?.toString();
        const pid = (req as AuthReq).profileId?.toString();
        const product = new Types.ObjectId(req.body.product);
        let cart = await CartServices.decrementByOneService(uid,pid,product)
        res.send({data:cart})
    } catch (error:any) {
        res.status(500).send({ message: "Error adding item to cart" });
    }
  }

  //Delete Particular Item
  public static async deleteParticularItem(req: Request, res: Response): Promise<void>{
    try {
        const uid = (req as AuthReq).userId?.toString();
        const pid = (req as AuthReq).profileId?.toString();
        const product = new Types.ObjectId(req.body.product);
        let cart = await CartServices.deleteParticularItem(uid,pid,product)
        res.send({data:cart})
    } catch (error:any) {
        res.status(500).send({ message: "Error adding item to cart" });
    }
  }

  //empty Cart
  public static async EmptyCart(req: Request, res: Response): Promise<void>{
    try {
        const uid = (req as AuthReq).userId?.toString();
        const pid = (req as AuthReq).profileId?.toString();
        let cart = await CartServices.EmptyCart(uid,pid)
        res.send({data:cart})
    } catch (error:any) {
        res.status(500).send({ message: "Error adding item to cart" });
    }
  }

  //Download Pdf
  public static async DownloadPDF(req: Request, res: Response): Promise<void>{
    try {
        const uid = (req as AuthReq).userId?.toString();
        const pid = (req as AuthReq).profileId?.toString();
        let cart = await CartServices.DownloadPDF(uid,pid)
      res.setHeader('Content-Disposition', `attachment; filename="${cart}"`);
      res.setHeader('Content-Type', 'application/pdf');
      fs.createReadStream(cart).pipe(res);
    } catch (error:any) {
        res.status(500).send('Internal Server Error');
    }
  }
}
