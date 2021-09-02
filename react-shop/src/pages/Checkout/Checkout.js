import { useState, useRef, useEffect } from "react";
import { withRouter } from "react-router-dom";

import "./Checkout.css";

function Checkout(props) {
  const [cart, setCart] = useState([]);
  const refCart = useRef(cart);

  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const refUserId = useRef(userId);

  useEffect(() => {
    fetch(`http://localhost:8085/t-shop/cart?id=${userId}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch");
        }
        return res.json();
      })
      .then((resData) => {
        setCart((refCart.current = resData.cart[0]));
      })
      .catch((e) => console.log("err", e));
  }, [userId]);

  useEffect(() => {
    setUserId((refUserId.current = localStorage.getItem("userId")));
  }, [userId]);

  function countTotalPrice() {
    const price = cart.reduce((acc, item) => {
      return (acc += item.count * item.price);
    }, 0);
    return price;
  }
  const price = countTotalPrice();

  function checkoutHandler() {
    fetch("http://localhost:8085/t-shop/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        totalPrice: price,
        cart: cart,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        //console.log(resData);
      })
      .catch((err) => {
        console.log("err", err);
      });

    props.history.push("/user");
  }

  return (
    <>
      <h3 className="checkout__header">Checkout page</h3>
      <div className="checkout-wrapper">
        <form>
          <h4>Payment:</h4>
          <div className="form-group">
            <input
              className="payment__input"
              id="cash"
              type="radio"
              value="cash"
              name="payment"
              defaultChecked
            ></input>
            <label htmlFor="cash">Cash</label>
          </div>

          <div className="form-group">
            <input
              className="payment__input"
              id="mastercard"
              type="radio"
              value="mastercard"
              name="payment"
              disabled
            ></input>
            <label htmlFor="mastercard">Mastercard</label>
          </div>

          <div className="form-group">
            <input
              className="payment__input"
              id="privatbank"
              type="radio"
              value="privatbank"
              name="payment"
              disabled
            ></input>
            <label htmlFor="privatbank">Privatbank</label>
          </div>

          <h4>Shipping:</h4>
          <div className="form-group">
            <input
              className="payment__input"
              id="self"
              type="radio"
              value="cash"
              name="shipping"
              defaultChecked
            ></input>
            <label htmlFor="self">Self</label>
          </div>

          <div className="form-group">
            <input
              className="payment__input"
              id="mastercard"
              type="radio"
              value="novaposhta"
              name="shipping"
              disabled
            ></input>
            <label htmlFor="mastercard">Nova Poshta +44.00 Uah</label>
          </div>

          <div className="form-group">
            <input
              className="payment__input"
              id="privatbank"
              type="radio"
              value="ukrposhta"
              name="shipping"
              disabled
            ></input>
            <label htmlFor="privatbank">UkrPoshta +60.00 UaH</label>
          </div>
        </form>

        <table className="cart">
          <thead>
            <tr>
              <th>Name</th>
              <th>Color</th>
              <th>Size</th>
              <th>Count</th>
              <th>Price(UAH)</th>
              <th>Total price(UAH)</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => {
              return (
                <tr key={item.id} className="cart-item">
                  <td>
                    {item.name} ({item.type})
                  </td>
                  <td> {item.color}</td>
                  <td>{item.size}</td>
                  <td> {item.count}</td>
                  <td>{item.price} </td>
                  <td>{item.price * item.count} </td>
                </tr>
              );
            })}
            <tr className="cart__total">
              <td>Total price</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>{countTotalPrice()}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button onClick={checkoutHandler} className="btn--checkout">
        Checkout
      </button>
    </>
  );
}

export default withRouter(Checkout);
