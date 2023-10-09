import ProductsData from "../Models/Products.js";

export const AddProduct = async (req, res) => {
  try {
    const { Barcode, ...otherFields } = req.body;
    if (!Barcode || Barcode.trim() === "") {
      return res.status(400).json({
        message: "Barcode  is required",
        status: false,
      });
    }

    // const BarcodeExists = await ProductsData.findOne({ ProductsData});
    // if (BarcodeExists) {
    //   return res.status(400).json({
    //     message: "Barcode name already exists",
    //     status: false,
    //   });
    // }

    const ProductData = { Barcode, ...otherFields };

    const Product = await ProductsData.create(ProductData);
    return res.status(201).json({
      message: "Account created successfully",
      status: true,
      result: Product,
    });


  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "An error occurred while creating the Product",
      error: error.message,
      status: false,
    });
  }
};


export const getProducts = async (req, res) => {
  try {

  }
  catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "An error occurred while fetching products ",
      error: error.message,
      status: false,
    });
  }
};



export const getProductsformBarcode = async (req, res) => {
  try {
    const { Barcode } = req.body

    if (!Barcode) {
      return res.status(400).json({
        message: "Barcode is required",
        status: false,
      });


    }

    const BarcodeDetails = await ProductsData.findOne({Barcode});

    if (!BarcodeDetails) {
      return res.status(404).json({
        message: "BarcodeDetails not found",
        status: false,
      });
    }
    return res.status(200).json({
      message: "Product details found successfully",
      status: true,
      result: BarcodeDetails,
    });

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "An error occurred while fetching products ",
      error: error.message,
      status: false,
    });
  }
};






export default {
  AddProduct,
  getProducts,
  getProductsformBarcode

}