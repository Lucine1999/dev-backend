import {
  createProductDB,
  getProductsDB,
  updateProductDB,
  deleteProductDB,
  getProductByIdDB,
  getProductsLengthDb,
} from "./db.js";

export const createProduct = async (req, res, next) => {
  try {
    const product = req.body;
    const createdProduct = await createProductDB(product);

    res.json({
      product: createdProduct,
      isAuth: res.locals.isAuth,
      user: res.locals.user,
    });
  } catch (error) {
    next(error);
  }
};
// export const getAllProducts = async (req, res, next) => {
//   const products = await getAllProductsDB();
//   res.json(products.data);
// };
export const getProducts = async (req, res, next) => {
  try {
    const skip = parseInt(req.query.skip);
    const take = parseInt(req.query.take);

    const products = await getProductsDB(skip, take);

    if (products.error) {
      res.status(400).send("Bad Request");
    }

    return res.json({
      products,
    });
  } catch (e) {
    next(e);
  }
};

export const getProductsCount = async (req, res, next) => {
  try {
    const productsLength = await getProductsLengthDb();
    return res.send({ productsLength });
  } catch (e) {
    next(e);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedProduct = await updateProductDB(id, req.body);
    res.json(updatedProduct.data);
  } catch (e) {
    next(e);
  }
};
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await deleteProductDB(id);
    res.json(deletedProduct.data);
  } catch (e) {
    next(e);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const foundProduct = await getProductByIdDB(productId);
    res.json(foundProduct);
  } catch (error) {
    next(error);
  }
};
