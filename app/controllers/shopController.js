const Shop = require("../models/Shop");

exports.getAllProducts = (req, res, next) => {
  Shop.getProducts()
    .then(([products]) => {
      res.status(200).json({
        message: "Fetched products successfully",
        products,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getProduct = (req, res, next) => {
  const { id } = req.params;

  Shop.getProduct(id)
    .then(([product]) => {
      res.status(200).json({
        message: "Fetched product successfully",
        product,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getProductTypes = (req, res, next) => {
  Shop.getTypes()
    .then(([types]) => {
      res.status(200).json({
        message: "Fetched types successfully",
        types,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getProductsOfType = (req, res, next) => {
  const { type } = req.query;

  Shop.getProductsOfType(type)
    .then(([products]) => {
      res.status(200).json({
        message: "Fetched products successfully",
        products,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getProductCategories = (req, res, next) => {
  Shop.getCategories()
    .then(([categories]) => {
      res.status(200).json({
        message: "Fetched categories successfully",
        categories,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getProductsOfCategory = (req, res, next) => {
  const { type } = req.query;
  const { category } = req.params;

  Shop.getProductsOfTypeAndCategory(type, category)
    .then(([products]) => {
      res.status(200).json({
        message: "Fetched products successfully",
        products,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
