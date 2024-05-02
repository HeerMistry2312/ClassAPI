import mongoose, { Document, Schema } from 'mongoose';

export interface ProductInterface extends Document {
  productName: string;
  Price: number;
  Desc: string;
}

const productSchema: Schema<ProductInterface> = new Schema({
  productName: {
    type: String,
    required: true,
    unique: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Desc: {
    type: String,
    required: true,
  },
});

const ProductModel = mongoose.model<ProductInterface>('Product', productSchema);

export default ProductModel;
