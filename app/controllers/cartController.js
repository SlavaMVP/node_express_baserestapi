const Cart = require("../models/cart");

exports.addItem = (req, res, next) => {
  const { userId, prodId, opId, count } = req.body;
  let quantity;

  Cart.findItem(userId, prodId, opId).then(([cartItem]) => {
    if (cartItem.length !== 0) {
      quantity = cartItem[0].count + 1;

      if (+count < quantity) {
        res.status(200).json({ message: "There is no available items!" });
        next();
      } else {
       
        Cart.editeItemCount(userId, prodId, opId, quantity)
          .then(() => {
            res.status(201).json({ message: "Item added!" });
          })
          .catch((err) => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
          });
      }
    } else {
      //add product if there is no such in cart
      quantity = 1;

      const cart = new Cart({
        userId,
        prodId,
        opId,
        count: quantity,
      });

      cart
        .save()
        .then(() => {
          res.status(201).json({ message: "Item added!" });
        })
        .catch((err) => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        });
    }
  });
};

exports.deleteItem = (req, res, next) => {
  const { userId, prodId, opId, count } = req.body;
  let quantity;

  Cart.findItem(userId, prodId, opId).then(([cartItem]) => {
    if(cartItem.length !== 0){
   
      quantity = cartItem[0].count - 1;

      if (+quantity === 0) {
       
        Cart.deleteItem(userId, prodId, opId).then(()=>{
          res.status(204).json({ message: "Cart item deleted!" });
        }).catch((err) => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        });
      } else {
        Cart.editeItemCount(userId, prodId, opId, quantity)
          .then(() => {
            res.status(201).json({ message: "1 item subtracted!" });
          })
          .catch((err) => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
          });
      }
    
    }
  });
};

exports.getUserCart = (req, res, next) => {
  const { id } = req.query;

  Cart.getCart(id)
    .then((cart) => {
      res.status(200).json({
        message: "Fetched user's cart successfully",
        cart,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.clearCart = (req, res, next) => {
  const { userId } = req.body;

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
      next(err);
    });
};
