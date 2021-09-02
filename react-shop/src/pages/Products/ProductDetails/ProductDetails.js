import { useEffect, useState, useRef } from "react";
import { withRouter } from "react-router-dom";
//import { connect } from "react-redux";
//import { bindActionCreators } from "redux";

//import * as actions from "../../../store/actions";
import "./ProductDetails.css";

function ProductDetails(props) {
  const [productData, setProductData] = useState({});
  const refContainer = useRef(productData);

  const [productId, setProductId] = useState(props.match.params.id);
  const refProductId = useRef(productId);

  const [message, setMessage] = useState("");
  const refMessage = useRef(message);

  const clientId = localStorage.getItem("userId");

  //componentDidMount
  useEffect(() => {
    fetch(`http://localhost:8085/t-shop/product/${productId}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch");
        }
        return res.json();
      })
      .then((resData) => {
        setProductData((refContainer.current = resData.product[0]));
        // console.log(resData.message);
      })
      .catch((e) => console.log("err", e));
  }, [productId]);

  useEffect(() => {
    setProductId((refProductId.current = props.match.params.id));
  }, [props.match.params.id]);

  function addToCartHandler() {
    //id = auto, cart_id , client_id+, product_id+, option_id+, count (1)
    //console.log("add to cart");

    fetch("http://localhost:8085/t-shop/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: clientId,
        prodId: productData.prodId,
        opId: productData.opId,
        count: productData.available,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        setMessage((refMessage.current = resData));
        //console.log(resData);
      })
      .catch((err) => {
        console.log("err", err);
      });
    //  console.log(productData);
  }

  function showMessage() {
    setTimeout(hideMessage, 2000);
    return message.message;
  }

  function hideMessage() {
    setMessage((refMessage.current = ""));
  }

  return (
    <>
      <div className="preview-wrapper">
        <div className="preview__image">
          <img
            className="preview__print"
            src={`${productData.img}`}
            alt="print"
          ></img>

          <svg
            className="product__img"
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="1063.000000pt"
            height="1280.000000pt"
            viewBox="0 0 1063.000000 1280.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
              fill={`${productData.color}`}
              stroke="none"
            >
              <path
                d="M6662 12635 c-153 -78 -384 -139 -592 -156 -63 -5 -147 -13 -186 -19
-88 -12 -549 -29 -784 -29 -104 0 -214 6 -270 15 -52 8 -160 19 -240 24 -146
9 -429 53 -573 90 l-78 19 -90 -39 c-49 -22 -123 -49 -163 -59 -53 -14 -92
-33 -142 -69 -38 -27 -92 -57 -121 -66 -28 -10 -147 -67 -265 -128 -117 -61
-316 -161 -443 -223 -209 -102 -260 -132 -554 -331 -457 -310 -690 -497 -879
-708 -127 -141 -144 -173 -207 -386 -43 -146 -136 -466 -225 -770 -96 -331
-223 -769 -270 -930 -27 -91 -68 -235 -93 -320 -25 -85 -80 -290 -122 -455
-67 -264 -83 -313 -131 -411 -43 -88 -56 -124 -61 -178 -4 -49 -14 -79 -35
-113 -26 -41 -28 -49 -17 -70 7 -12 20 -23 29 -23 13 0 308 -111 585 -219 28
-11 185 -70 350 -132 354 -132 617 -213 885 -275 107 -24 202 -46 210 -49 9
-3 35 9 58 26 38 28 42 35 42 75 0 37 12 65 66 159 37 63 71 115 75 115 5 0
10 -12 10 -27 1 -16 2 -39 3 -53 1 -14 3 -42 4 -63 2 -32 5 -37 21 -32 16 5
19 -3 25 -72 4 -43 32 -253 61 -466 l55 -388 -25 -170 c-15 -102 -42 -230 -69
-326 -41 -143 -45 -172 -51 -308 -7 -148 -23 -247 -79 -493 -40 -170 -77 -636
-64 -798 l9 -121 -94 -209 c-52 -115 -127 -303 -167 -419 l-72 -210 -20 -240
c-16 -209 -19 -332 -17 -955 1 -713 1 -715 -23 -860 -21 -123 -27 -145 -41
-142 -39 7 -12 -47 113 -220 72 -102 114 -151 137 -162 58 -28 189 -36 778
-49 727 -15 1686 -11 1960 8 110 8 306 22 435 30 603 40 812 59 1170 105 545
69 690 87 990 120 175 19 355 47 525 80 143 28 316 62 385 75 166 32 305 75
320 98 9 15 8 24 -5 44 -22 32 -55 130 -55 159 0 13 -13 38 -30 57 -22 25 -34
57 -51 128 -11 52 -25 103 -30 114 -15 32 -39 156 -39 202 0 23 -5 54 -10 69
-6 14 -22 99 -35 188 -14 88 -29 175 -33 191 -5 17 -17 86 -26 155 -10 69 -22
135 -27 148 -5 13 -14 67 -19 120 -6 53 -19 147 -29 207 -11 61 -27 155 -37
210 -10 54 -23 111 -31 125 -7 14 -13 30 -13 37 0 6 -11 24 -24 40 -13 15 -35
52 -50 81 -26 51 -27 59 -21 150 11 176 8 316 -9 412 -9 52 -20 142 -26 200
-5 58 -16 141 -24 185 -9 44 -20 143 -26 220 -6 77 -18 181 -27 230 -21 109
-24 502 -5 690 25 261 36 462 52 955 6 173 15 407 20 520 6 112 10 316 10 452
0 216 2 248 15 248 9 0 19 -10 24 -22 5 -13 25 -58 45 -100 20 -42 36 -84 36
-93 0 -31 41 -178 60 -216 34 -66 43 -69 241 -69 l176 0 224 69 c161 49 263
88 364 136 197 95 301 144 525 247 107 49 202 95 210 102 17 14 101 64 140 83
107 53 226 132 243 161 19 33 19 33 -7 125 -14 51 -26 107 -26 123 0 20 -12
47 -34 75 -23 30 -40 69 -54 124 -11 44 -25 92 -30 106 -6 14 -18 57 -27 95
-9 38 -20 78 -25 89 -9 19 -32 99 -84 290 -11 44 -24 85 -28 90 -3 6 -16 49
-28 95 -11 47 -27 101 -34 120 -8 19 -21 67 -31 105 -9 39 -20 79 -25 90 -5
11 -17 49 -25 85 -9 36 -24 90 -34 120 -33 98 -64 204 -78 265 -7 33 -17 69
-23 80 -5 11 -20 63 -34 115 -34 133 -65 241 -76 265 -5 11 -19 63 -31 115
-12 52 -26 100 -30 106 -5 6 -15 44 -24 84 -9 40 -20 79 -26 87 -7 7 -8 13 -4
13 4 0 2 6 -4 14 -6 7 -16 62 -22 122 -11 104 -49 230 -84 274 -6 8 -25 37
-41 64 -16 27 -38 64 -49 82 -79 131 -262 344 -295 344 -6 0 -36 20 -67 43
-32 24 -71 51 -88 59 -16 9 -122 63 -235 121 -270 138 -385 200 -725 392 -78
44 -212 118 -275 153 -30 16 -95 53 -144 81 -49 28 -93 51 -99 51 -6 0 -18 6
-26 14 -9 8 -79 48 -156 90 -110 59 -154 89 -205 141 -35 36 -71 65 -80 65
-36 1 -94 31 -163 84 -40 31 -75 56 -78 55 -2 0 -41 -20 -87 -44z"
              />
            </g>
          </svg>
        </div>
        <div className="preview__info">
          <h3>Product Details:</h3>

          <p>
            Name: <b>"{productData.name}"</b>
          </p>
          <p>Type: {productData.type}</p>
          <p>Size: {productData.size}</p>
          <p>Material: {productData.material}</p>
          <p>Color: {productData.color}</p>
          <p>Available: {productData.available}</p>
          <p>Price: {productData.price}UAH</p>
          <button
            type="button"
            className="add-btn"
            onClick={addToCartHandler}
            disabled={!clientId}
            title={
              !clientId ? "You should login first" : "Add product into cart"
            }
          >
            Add to Cart
          </button>
        </div>
      </div>
      <p className="message">{message.message ? showMessage() : null}</p>
    </>
  );
}

/*
const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = (dispatch) => {
  const { addToCart } = bindActionCreators(actions, dispatch);

  return {
    addToCart: (cartItem) => addToCart(cartItem),
  };
};


const ComponentWithRouter = withRouter(ProductDetails);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComponentWithRouter);
*/

export default withRouter(ProductDetails);
