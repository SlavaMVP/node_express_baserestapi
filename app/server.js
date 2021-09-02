const path = require("path");

const express = require("express");
const cors = require("cors");
//const db = require("./config/db");
const shopRoutes = require("./routes/shopRoutes");
const userRoutes = require("./routes/userRoutes");

const PORT = process.env.PORT || 8080;

const app = express();

//implemented as public api
const corsOptions = {
  origin: "*",
};

//middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "public/img")));

//handle our routes
app.use("/t-shop", shopRoutes);
app.use("/t-shop", userRoutes);

//handle all server err
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message;
  const data = err.data;
  res.status(status).json({ message, data });
});

app.listen(PORT, () => {
  console.log("Server is running");
});
