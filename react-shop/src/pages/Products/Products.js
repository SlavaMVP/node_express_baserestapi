import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Product from "./Product/Product";
import Categories from "../../components/Categories/Categories";
import "./Products.css";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      category: null,
      products: [],
    };
  }

  componentDidMount() {
    const type = this.props.location.search.split("=")[1];

    this.setState((prevState) => {
      return { ...prevState, type };
    });

    this.fetchProductsData(type);
  }

  componentDidUpdate() {
    this.updateState();
  }

  //fix router match problem
  updateState() {
    const type = this.props.location.search.split("=")[1];
    const category = this.props.match.params.category;

    if (this.props.location.search.split("=")[1] !== this.state.type) {
      this.setState((prevState) => {
        return { ...prevState, type };
      });
      this.fetchProductsData(type);
    }

    if (this.props.match.params.category !== this.state.category) {
      this.setState((prevState) => {
        return { ...prevState, category };
      });
      this.fetchProductsData(type, category);
    }
  }

  fetchProductsData(type, category) {
    let fetchLink;
    if (category === undefined) {
      fetchLink = `http://localhost:8085/t-shop/products?type=${type}`;
    } else {
      fetchLink = `http://localhost:8085/t-shop/products/${category}?type=${type}`;
    }
    fetch(fetchLink)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch");
        }
        return res.json();
      })
      .then((resData) => {
        this.setState((prevState) => {
          return { ...prevState, products: resData.products };
        });
        //console.log(resData.message);
      })
      .catch((e) => console.log("err", e));
  }

  render() {
    let template;
    const products = this.state.products.map((item) => {
      return <Product key={item.id} data={item} />;
    });

    template = products.length ? (
      products
    ) : (
      <p className="products-info">There is no products yet here!</p>
    );

    return (
      <main className="wrapper">
        <Categories />
        <div className="products-wrapper"> {template}</div>
      </main>
    );
  }
}

export default withRouter(Products);
