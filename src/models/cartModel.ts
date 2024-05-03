import mongoose, { Document, Schema } from 'mongoose';
import { UserInterface } from './userModel';
import { ProductInterface } from './productModel';
import { ProfileInterface } from './profileModel';

export interface CartInterface extends Document {
  userId: mongoose.Types.ObjectId | UserInterface;
  profileId: mongoose.Types.ObjectId | ProfileInterface;
  items: {
    product: mongoose.Types.ObjectId | ProductInterface;
    quantity: number;
  }[];
}

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
  items: [{
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
  }],
});

const CartModel = mongoose.model<CartInterface>('Cart', cartSchema);

export default CartModel;
