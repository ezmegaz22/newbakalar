import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please ennter a product name"],
  },
  description: {
    type: String,
    required: [true, "Please ennter a product description"],
  },
  price: {
    type: Number,
    required: [true, "Please ennter a product price"],
  },
  image: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter a category name"],
    enum: {
      values: ["Elektronika", "Laptop", "Fejhallgató"],
      message: "Please select a correct category",
    },
  },
  seller: {
    type: String,
    required: [true, "Please enter a product seller"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter a product stock"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
