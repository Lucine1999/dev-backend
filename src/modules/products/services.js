import {
  createProductDB,
  getAllProductsDB,
  updateProductDB,
  deleteProductDB,
} from "./db.js";

export const createProduct = async (req, res, next) => {
  try {
    const product = req.body;
    const createdProduct = await createProductDB(product);
    res.json({
      data: createdProduct,
      message: "Successfully created a new product!!",
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  const products = await getAllProductsDB();
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};
  if (endIndex < products.data.length) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }
  results.length = Math.ceil(products.data.length / 9);
  results.results = products.data.slice(startIndex, endIndex);
  if (results.length) {
    res.send(results);
  } else {
    res.send("No data yet");
  }

  // res.json(results)
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedProduct = await updateProductDB(id, req.body);
    res.json(updatedProduct.data);
  } catch (e) {
    console.log(e);
    next(e);
  }
};
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await deleteProductDB(id);
    res.json(deletedProduct.data);
  } catch (e) {
    console.log(e);
    next(e);
  }
};
