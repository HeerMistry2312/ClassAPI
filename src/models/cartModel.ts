
import mongoose, { Document, Schema } from 'mongoose';
import { UserInterface } from './userModel';
import Product,{ ProductInterface } from './productModel';
import { ProfileInterface } from './profileModel';

export interface CartItemInterface {
  product: mongoose.Types.ObjectId | ProductInterface;
  quantity: number;
  totalPrice: number;
}

export interface CartInterface extends Document {
  userId: mongoose.Types.ObjectId | UserInterface;
  profileId: mongoose.Types.ObjectId | ProfileInterface;
  items: CartItemInterface[];
  totalAmount: number;
}

const cartItemSchema: Schema<CartItemInterface> = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

const cartSchema: Schema<CartInterface> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  profileId: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
  },
  items: [cartItemSchema],
  totalAmount: {
    type: Number,
    required: true,
    default: 0,
  },
});


cartSchema.pre<CartInterface>('save', async function(next) {
  let totalAmount = 0;
  for (const item of this.items) {
    // Fetch the product details from the Product model
    const product = await Product.findById(item.product);
    if (product) {

      item.totalPrice = product.Price * item.quantity;
      totalAmount += item.totalPrice;
    }
  }
  this.totalAmount = totalAmount;
  next();
});

const CartModel = mongoose.model<CartInterface>('Cart', cartSchema);

export default CartModel;
