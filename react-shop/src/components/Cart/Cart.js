import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import "./Cart.css";

function Cart(props) {
  const [cart, setCart] = useState([]);
  const refCart = useRef(cart);

  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const refUserId = useRef(userId);

  useEffect(() => {
    fetchCartItems()
  }, []);

  useEffect(() => {
    setUserId((refUserId.current = localStorage.getItem("userId")));
  }, [userId]);

 function fetchCartItems(){
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
 }

 function addProductHandler(item){
  fetch("http://localhost:8085/t-shop/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      prodId: item.prodId,
      opId: item.opid,
      count: item.avl,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((resData) => {
    
      fetchCartItems()
    })
    .catch((err) => {
      console.log("err", err);
    });
    
 
 }

 function subtractProductHandler(item){

  fetch("http://localhost:8085/t-shop/cart", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      prodId: item.prodId,
      opId: item.opid,
      count: item.avl,
    }),
  })
    .then((res) => {
   
      return res;
    })
    .then(() => {
     
      fetchCartItems()
    })
    .catch((err) => {
      console.log("err", err);
    });
   
}

function countTotalPrice() {
  return cart.reduce((acc, item) => {
    return (acc += item.count * item.price);
  }, 0);
}

  return (
    <div>
      <h2 className="cart__header">Cart</h2>

      {cart.length !== 0 ? (
        <>
          <table className="cart">
            <thead>
              <tr>
                <th>Name</th>
                <th>Color</th>
                <th>Size</th>
                <th>Count</th>
                <th>Price(UAH)</th>
                <th>Total price(UAH)</th>
                <th></th>
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
                    <td>
                      <button className="btn--add" jsx-a11y="add" onClick={addProductHandler.bind(null, item)}>+</button> 
                      <button className="btn--subtract" jsx-a11y="subtract" onClick={subtractProductHandler.bind(null, item)}>-</button> 
                      </td>
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
                <td></td>
              </tr>
            </tbody>
          </table>
          <Link to="/checkout" className="btn--order">
            Order
          </Link>
        </>
      ) : (
        <p className="cart__info">Your cart is empty</p>
      )}
    </div>
  );
}

export default Cart;

