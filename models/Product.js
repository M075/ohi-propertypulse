import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const ProductSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: false,
    },
    discountPercentage: {
      type: Number,
      required: false,
    },
    rating: {
      type: Number,
      required: false,
    },
    review: [
      {
        reviewer: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        comment: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    stock: {
      type: Number,
      required: false,
    },
    brand: {
      type: String,
    },
    category: {
      type: String,
    },
    deliveryOptions: {
      delivery: { 
        type: Boolean, 
        default: false 
      },
      collection: { 
        type: Boolean, 
        default: false 
      }
    },
    keywords: {
      type: String,
    },
    warranty: {
      type: String,
    },
    shippingOrigin: {
      type: String,
    },
    featured: {
      type: String,
    },
    status: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = models.Product || model("Product", ProductSchema);

export default Product;
