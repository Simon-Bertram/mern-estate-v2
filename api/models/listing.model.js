import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
    },
    description: {
      type: String,
      required: [true, "Please enter a description"],
    },
    address: {
      type: String,
      required: [true, "Please enter an address"],
    },
    regularPrice: {
      type: Number,
      required: [true, "Please enter a regular price"],
    },
    discountedPrice: {
      type: Number,
      required: [true, "Please enter a discounted price"],
    },
    bathrooms: {
      type: Number,
      required: [true, "Please enter the number of bathrooms"],
    },
    bedrooms: {
      type: Number,
      required: [true, "Please enter the number of bedrooms"],
    },
    furnished: {
      type: Boolean,
      default: false,
    },
    parking: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      required: [true, "Please enter a type"],
    },
    offer: {
      type: Boolean,
      required: [true, "Please enter an offer"],
    },
    imageUrls: {
      type: Array,
      required: [true, "Please enter image urls"],
    },
    userRef: {
      type: String,
      required: [true, "Please enter a user reference"],
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
