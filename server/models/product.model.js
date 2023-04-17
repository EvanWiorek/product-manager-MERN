const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { 
      type: String,
      required: true,
    },
    price: { 
      type: Number,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: `{VALUE} is not a number.`
      }
    },
    description: { 
      type: String,
      required: true
     },
  },
  { timestamps: true }//this is making the updateAt and createdAt fields of the Product documents
);

module.exports.Product = mongoose.model('Product', ProductSchema);
