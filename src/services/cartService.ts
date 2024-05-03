import Cart, { CartInterface } from "../models/cartModel";
import fs from "fs";
import PDFDocument from "pdfkit";
import { Types } from "mongoose";
import User from "../models/userModel";
import Profile from "../models/profileModel";
import path from "path";
import Product, { ProductInterface } from "../models/productModel";

export class CartServices {
  //GoTo Cart Service
  public static async gotoCartService(
    uid: String | undefined,
    pid: String | undefined
  ): Promise<object> {
    const cart = await Cart.findOne({ userId: uid, profileId: pid });
    if (!cart) {
      return { message: "Cart Is Empty" };
    }
    return cart;
  }

  //addTo Cart Service
  public static async addtoCartService(
    uid: String | undefined,
    pid: String | undefined,
    product: Types.ObjectId,
    quantity: number
  ): Promise<object> {
    let cart = await Cart.findOne({ userId: uid, profileId: pid });

    if (cart) {
      const cartItem = cart.items.find(
        (item) => item.product.toString() === product.toString()
      );
      if (cartItem) {
        cartItem.quantity += quantity;
      } else {
        cart.items.push({
          product,
          quantity,
          totalPrice: 0,
        });
      }
      cart = await cart.save();
    } else {
      cart = new Cart({
        userId: uid,
        profileId: pid,
        items: [{ product: product, quantity: quantity }],
      });
      console.log(cart);
      cart = await cart.save();
    }
    return cart;
  }

  //decrement Item
  public static async decrementByOneService(
    uid: String | undefined,
    pid: String | undefined,
    product: Types.ObjectId
  ): Promise<object> {
    let cart = await Cart.findOne({ userId: uid, profileId: pid });

    if (!cart) {
      return { Message: "Cart Not Found" };
    }
    const item = cart.items.find(
      (item) => item.product.toString() === product.toString()
    );
    if (!item) {
      return { Message: "No Items Found" };
    }
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      cart.items = cart.items.filter(
        (item) => item.product.toString() != product.toString()
      );
    }
    cart = await cart.save();
    return cart;
  }

  //delete particular item
  public static async deleteParticularItem(
    uid: String | undefined,
    pid: String | undefined,
    product: Types.ObjectId
  ): Promise<object> {
    let cart = await Cart.findOne({ userId: uid, profileId: pid });
    if (!cart) {
      return { Message: "Cart Not Found" };
    }

    const item = cart.items.findIndex(
      (item) => item.product.toString() === product.toString()
    );
    if (item === -1) {
      return { Message: "Item Not Found" };
    }
    cart.items.splice(item, 1);
    cart = await cart.save();
    return cart;
  }

  //emptyCart
  public static async EmptyCart(
    uid: String | undefined,
    pid: String | undefined
  ): Promise<object> {
    let cart = await Cart.findOne({ userId: uid, profileId: pid });
    if (!cart) {
      return { Message: "Cart Not Found" };
    }
    cart.items = [];
    cart = await cart.save();
    return cart;
  }

  //download Pdf file
  public static async DownloadPDF(
    uid: String | undefined,
    pid: String | undefined
  ): Promise<string> {
    const cart = await Cart.findOne({ userId: uid, profileId: pid });
    if (!cart) {
      return "Cart Not Found";
    }
    const user = await User.findOne({ _id: uid });
    const profile = await Profile.findOne({ RefId: uid, _id: pid });
    const doc = new PDFDocument();
    const fileName = `${profile?.Name}.pdf`;

    const filePath = path.join("src", "pdf_files", fileName);

    doc.pipe(fs.createWriteStream(filePath));
    doc.fontSize(18).text("User Cart Details", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`User Name: ${user?.userName}`);
    doc.moveDown();
    doc.fontSize(14).text(`Profile Name: ${profile?.Name}`);
    doc.moveDown();
    doc.fontSize(14).font("Helvetica-Bold").text("Items:", { underline: true });
    doc.moveDown();
    let Ycod = doc.y;
    /// Table header
    doc.font("Helvetica-Bold").text("Product Name", 70, Ycod);
    doc.text("Quantity", 250, Ycod);
    doc.text("Price", 350, Ycod);
    doc.text("Total Price", 450, Ycod);
    doc.moveDown();
    let products = await Product.find({});
    // Table rows
    cart.items.forEach((item) => {
      const product = products.find((p) => p._id.equals(item.product));
      if (product) {
        let Ycod = doc.y;
        doc.font("Helvetica").text(product.productName, 100, Ycod);
        doc.text(item.quantity.toString(), 250, Ycod);
        doc.text(product.Price.toString(), 350, Ycod);
        doc.text(item.totalPrice.toString(), 450, Ycod);
        doc.moveDown();
      }
    });

    // Total amount
    doc.moveDown();
    doc
      .font("Helvetica-Bold")
      .text(`Total Amount: ${cart.totalAmount}`, 350, doc.y);

    doc.end();

    return filePath;
  }
}
