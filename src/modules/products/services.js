import {
  createProductDB,
  getProductsDB,
  updateProductDB,
  deleteProductDB,
  getProductByIdDB,
  getAllProductsCountDB,
  getFilteredProductsCountDB,
  getHighestPriceDB,
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
    next(error);
  }
};

export const getAllProductsCount = async (req, res, next) => {
  try {
    const productsLength = await getAllProductsCountDB();
    return res.send({ productsLength });
  } catch (e) {
    next(e);
  }
};

export const getShopProducts = async (req, res, next) => {
  try {
    const page = +req.query.page;
    const brand = req.query.brand;
    const category = req.query.category;
    const min = +req.query.min;
    const max = +req.query.max;

    const brandNumbers = [];
    const categoryNumbers = [];

    if (Array.isArray(brand)) {
      brand.forEach((num) => brandNumbers.push(+num));
    } else if (brand) {
      brandNumbers.push(+brand);
    }
    if (Array.isArray(category)) {
      category.forEach((num) => categoryNumbers.push(+num));
    } else if (category) {
      categoryNumbers.push(+category);
    }
    const result = await getProductsDB(
      page,
      brandNumbers,
      categoryNumbers,
      min,
      max,
    );
    const resultCount = await getFilteredProductsCountDB(
      page,
      brandNumbers,
      categoryNumbers,
      min,
      max,
    );
    console.log("count - ", resultCount);
    return res.json({ data: result, dataCount: resultCount });
  } catch (e) {
    next(e);
  }
};

export const getHighestPrice = async (req, res, next) => {
  try {
    const highestPrice = await getHighestPriceDB();
    res.json({ data: highestPrice });
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
