const router = require("express").Router();
const { body } = require("express-validator");

const User = require("../models/user");
const userController = require("../controllers/userController");
const cartController = require("../controllers/cartController");
const orderController = require("../controllers/orderController");
const isAuth = require("../middlewares/is-auth"); //can be used as protect middleware

//used express-validate for register and login inputs
router.put(
  "/signup",
  [
    body("name").trim().not().isEmpty(),
    body("surname").trim().not().isEmpty(),
    body("email")
      .isEmail()
      .withMessage("Enter valid email")
      .custom((value, { req }) => {
        return User.getUser(value).then(([user]) => {
          if (user.length) {
            return Promise.reject("Already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("country").trim().not().isEmpty(),
    body("city").trim().not().isEmpty(),
    body("address").trim().not().isEmpty(),
    body("password").trim().isLength({ min: 6 }),
  ],
  userController.signup
);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Enter valid email")
      .custom((value, { req }) => {
        return User.getUser(value).then(([user]) => {
          if (!user.length) {
            return Promise.reject(`There is no user with ${value} email yet!`);
          }
        });
      })
      .normalizeEmail(),

    body("password").trim().isLength({ min: 6 }),
  ],
  userController.login
);

router.get("/user", userController.getUserInfo);
router.get("/orders", orderController.getUserOrders);
router.get("/order", orderController.getUserOrder);
router.post("/order", orderController.createOrder);

//should be implemented in as Promise.all in front-end  or in cicle inside orderController ??
//router.post("/usert/orderDetails", orderController.createOrderDetails); //not implemented

router.get("/cart", cartController.getUserCart);
router.post("/cart", cartController.addItem);
router.delete("/cart", cartController.deleteItem);
//router.delete("/cart", cartController.clearCart); //implemented inside orderController

module.exports = router;
