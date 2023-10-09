import mongoose from "mongoose";
import { Schema } from "mongoose";

const ProductsDataSchema = new Schema(
    {
        Name: {
            type: String,
            unique: true,
            required: true,
            uppercase: true
        },
        Description: {
            type: String,
         
            // required: true,
            uppercase: true
        },
        Barcode: {
            type: String,
            unique: true,
            uppercase: true,
            // required: true,
        },
        Instock: {
            type: String,
            uppercase: true,
            // required: true,
        },
        Remark: {
            type: String,
        },
        Price: {
            type: String,
            Required:true
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },

    },
    {
        timestamps: true,
    }
);



const ProductsData = mongoose.model("ProductsData", ProductsDataSchema);
export default ProductsData;