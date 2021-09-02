import { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Order from "./Order/Order";
import OrderDetails from "./OrderDetails/OrderDetails";
import "./Orders.css";

export default function UserPage(props) {
  const [orders, setOrders] = useState([]);
  const refOrders = useRef(orders);

  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const refUserId = useRef(userId);

  useEffect(() => {
    fetch(`http://localhost:8085/t-shop/orders?id=${userId}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch");
        }
        return res.json();
      })
      .then((resData) => {
        setOrders((refOrders.current = resData.orders));
        // console.log(resData.message);
      })
      .catch((e) => console.log("err", e));
  }, [userId]);

  useEffect(() => {
    setUserId((refUserId.current = localStorage.getItem("userId")));
  }, [userId]);

  //console.log(orders);

  return (
    <Router>
      <div className="orders-wrapper">
        {orders.length === 0 ? (
          <p>You have no orders yet!</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Status</th>
                <th>Payment</th>
                <th>Shipping</th>
                <th>Price(UAH)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, i) => {
                return <Order idx={i + 1} item={item} key={item.id} />;
              })}
            </tbody>
          </table>
        )}

        <div>
          <Route path="/user/order/:id">
            <OrderDetails />
          </Route>
        </div>
      </div>
    </Router>
  );
}
