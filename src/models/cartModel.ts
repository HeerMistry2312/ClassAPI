// import mongoose, { Document, Schema } from 'mongoose';
// import { UserInterface } from './userModel';
// import { ProductInterface } from './productModel';
// import { ProfileInterface } from './profileModel';

// export interface CartInterface extends Document {
//   userId: mongoose.Types.ObjectId | UserInterface;
//   profileId: mongoose.Types.ObjectId | ProfileInterface;
//   items: {
//     product: mongoose.Types.ObjectId | ProductInterface;
//     quantity: number;
//   }[];
// }

// const cartSchema: Schema<CartInterface> = new Schema({
//   userId: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   profileId: {
//     type: Schema.Types.ObjectId,
//     ref: 'Profile',
//     required: true,
//   },
//   items: [{
//     product: {
//       type: Schema.Types.ObjectId,
//       ref: 'Product',
//       required: true,
//     },
//     quantity: {
//       type: Number,
//       required: true,
//       default: 1,
//     },
//   }],
// });

// const CartModel = mongoose.model<CartInterface>('Cart', cartSchema);

// export default CartModel;


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
  items: [cartItemSchema], // Use cartItemSchema for items array
  totalAmount: {
    type: Number,
    required: true,
    default: 0, // Set default value to 0
  },
});

// Calculate total price for each item and total amount for the entire cart before saving
cartSchema.pre<CartInterface>('save', async function(next) {
  let totalAmount = 0;
  for (const item of this.items) {
    // Fetch the product details from the Product model
    const product = await Product.findById(item.product);
    if (product) {
      // Calculate total price for the item based on the product price
      item.totalPrice = product.Price * item.quantity;
      totalAmount += item.totalPrice;
    }
  }
  this.totalAmount = totalAmount;
  next();
});

const CartModel = mongoose.model<CartInterface>('Cart', cartSchema);

export default CartModel;
