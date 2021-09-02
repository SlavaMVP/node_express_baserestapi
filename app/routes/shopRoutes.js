const router = require("express").Router();
const shopController = require("../controllers/shopController");

router.get("/types", shopController.getProductTypes);
router.get("/categories", shopController.getProductCategories);
router.get("/products", shopController.getProductsOfType); //type as query
router.get("/products/:category", shopController.getProductsOfCategory); //type as query

router.get("/product/:id", shopController.getProduct);

module.exports = router;
