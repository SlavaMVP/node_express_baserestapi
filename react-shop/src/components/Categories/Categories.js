import { useEffect, useState, useRef } from "react";
import { Link, withRouter } from "react-router-dom";

import "./Categories.css";

function Categories(props) {
  let [categories, setCategories] = useState([]);
  const refCategories = useRef(categories);

  let [type, setType] = useState(null);
  const refType = useRef(type);

  let [category, setCategory] = useState(null);
  const refCategory = useRef(category);

  //componentDidMount
  useEffect(() => {
    fetch("http://localhost:8085/t-shop/categories")
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch");
        }
        return res.json();
      })
      .then((resData) => {
        setCategories((refCategories.current = resData.categories));
        // console.log(resData.message);
      })
      .catch((e) => console.log("err", e));
  }, []);

  useEffect(() => {
    setType((refType.current = props.location.search.split("=")[1]));
  }, [props.location.search]);

  useEffect(() => {
    setCategory((refCategory.current = props.match.params.category));
  }, [props.match.params]);

  return (
    <div className="categories-wrapper">
      <b className="categories__title">Categories:</b>
      <ul className="categories__list">
        {categories.map((item) => {
          return (
            <Link
              to={`/products/${item.name}?type=${type}`}
              key={item.id}
              className={`categories__link `}
            >
              <li
                className={`categories__item  ${
                  category === item.name ? "categories__item--active" : ""
                }`}
              >
                {item.name}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default withRouter(Categories);
