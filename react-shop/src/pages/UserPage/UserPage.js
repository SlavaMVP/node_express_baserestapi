import { useEffect, useState, useRef } from "react";

import Orders from "../Orders/Orders";
import "./UserPage.css";

export default function UserPage(props) {
  let [userdata, setUserData] = useState([]);
  const refUserData = useRef(userdata);

  let [userEmail, setUserEmail] = useState(localStorage.getItem("email"));
  const refUserEmail = useRef(userEmail);

  useEffect(() => {
    fetch(`http://localhost:8085/t-shop/user?email=${userEmail}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch");
        }
        return res.json();
      })
      .then((resData) => {
        setUserData((refUserData.current = resData.data[0]));
      })
      .catch((e) => console.log("err", e));
  }, [userEmail]);

  useEffect(() => {
    setUserEmail((refUserEmail.current = localStorage.getItem("email")));
  }, [userEmail]);

  return (
    <main className="userpage-wrapper">
      <button className="logout-link" onClick={props.onLogout}>
        Logout
      </button>

      <div>
        <h2>Personal Info:</h2>
        <p>
          Name: {userdata.name} {userdata.surname}
        </p>
        <p>Email: {userdata.email}</p>
        <p>
          Address: {userdata.country}, {userdata.city}, {userdata.address}
        </p>
        <p>
          Registration date:{" "}
          {new Date(userdata.registration_date).toLocaleDateString()}
        </p>
      </div>
      <div>
        <h3>Your Orders:</h3>
        <Orders />
      </div>
    </main>
  );
}
