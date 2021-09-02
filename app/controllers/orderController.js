const Order = require("../models/Order");
const OrderDetails = require("../models/OrderDetail");
const Cart = require("../models/Cart");

exports.getUserOrders = (req, res, next) => {
  const { id } = req.query;
  Order.getOrders(id)
    .then(([orders]) => {
      res.status(200).json({
        message: "Fetched user orders successfully",
        orders,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getUserOrder = (req, res, next) => {
  const { id } = req.query;
  Order.getOrder(id)
    .then(([order]) => {
      res.status(200).json({
        message: "Fetched user order successfully",
        order,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createOrder = (req, res, next) => {
  const { userId, totalPrice, cart } = req.body;

  //userId //for both
  //totalPrice //only for order
  //count //for each prod
  //price //for each prod
  //prod id //for each prod
  //op id //for each prod

  const order = new Order({
    userId,
    totalPrice,
  });

  order
    .save()
    .then((ord) => {
      res
        .status(201)
        .json({ message: "Order created!", orderId: ord[0].insertId });
      return ord[0].insertId;
    })
    .then((orderId) => {
     // console.log(orderId);
      //todo save order details
    })
    .then(() => {
      Cart.clearCart(userId)
        .then(() => {
          res.status(204).json({
            message: "Cart cleared",
          });
        })
        .catch((err) => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          return err;
        });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
