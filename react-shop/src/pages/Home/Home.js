import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

class Home extends Component {
  state = {
    types: [],
  };

  componentDidMount() {
    fetch("http://localhost:8085/t-shop/types")
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch");
        }
        return res.json();
      })
      .then((resData) => {
        this.setState({
          types: resData.types,
        });
        // console.log(resData.message);
      })
      .catch((e) => console.log("err", e));
  }

  render() {
    const types = this.state.types.map((item) => {
      return (
        <li key={item.type_id} className="type__item">
          <Link to={"/products?type=" + item.name}>
            <div className="type-wrapper">
              <img src={`${item.image}`} alt="type preview"></img>
              {item.name}
            </div>
          </Link>
        </li>
      );
    });

    return (
      <main className="wrapper">
        <ul className="types__list">{types}</ul>
      </main>
    );
  }
}

export default Home;
