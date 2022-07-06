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
      isAuth: res.locals.isAuth,
      user: res.locals.user,
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
    const pageType = req.params.pageType;
    const page = +req.query.page || 1;
    const brand = req.query.brand;
    const category = req.query.category;
    const min = +req.query.min;
    const max = +req.query.max;
    const keyword = req.query.keyword;

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
      keyword,
      res.locals.userId,
      pageType,
    );
    const resultCount = await getFilteredProductsCountDB(
      brandNumbers,
      categoryNumbers,
      min,
      max,
      keyword,
    );

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
    const { productId } = req.params;
    const updatedProduct = await updateProductDB(productId, req.body);
    res.json({
      data: updatedProduct.data,
      user: res.locals.user,
    });
  } catch (e) {
    next(e);
  }
};
export const deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await deleteProductDB(productId);

    res.json({
      data: deletedProduct.data,
      user: res.locals.user,
    });
  } catch (e) {
    next(e);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await getProductByIdDB(
      +productId,
      res.locals.isAuth ? res.locals.userId : null,
    );
    res.json({ data: product });
  } catch (error) {
    next(error);
  }
};
