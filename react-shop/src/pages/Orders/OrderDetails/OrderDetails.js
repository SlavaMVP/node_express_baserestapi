import { useEffect, useState, useRef } from "react";
import { withRouter } from "react-router-dom";

import "./OrderDetails.css";

function OrderDetails(props) {
  const [orderDetails, setOrderDetails] = useState([]);
  const refOrderDetails = useRef(orderDetails);

  let [orderId, setOrderId] = useState(props.match.params.id);
  const refOrderId = useRef(orderId);

  useEffect(() => {
    fetchOrderDetails(orderId);
  }, [orderId]);

  useEffect(() => {
    setOrderId((refOrderId.current = props.match.params.id));
  }, [props.match.params.id]);

  function fetchOrderDetails(orderId) {
    fetch(`http://localhost:8085/t-shop/order?id=${orderId}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch");
        }
        return res.json();
      })
      .then((resData) => {
        setOrderDetails((refOrderDetails.current = resData.order));
        console.log(resData);
      })
      .catch((e) => console.log("err", e));
  }

  //TODO user id + order id
  return (
    <>
      {orderDetails.length ? <h3>Order details:</h3> : null}

      {orderDetails.map((item) => {
        return (
          <div key={item.id} className="order__details">
            <p>
              Name: {item.name}; Color: {item.color}; Material: {item.material};
              Size: {item.size}; Count: {item.count}
            </p>
          </div>
        );
      })}
    </>
  );
}

export default withRouter(OrderDetails);
