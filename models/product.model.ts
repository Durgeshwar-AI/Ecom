import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  image?: string;
  createdAt?: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true } // adds createdAt & updatedAt
);

// Prevent model overwrite issues in Next.js / hot reloads
const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export default Product;
