import express from "express";
import data from "./data";
import config from "./config";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import bodyparser from "body-parser";
const app = express();

app.use(bodyparser.json());

dotenv.config();

const mongodbURL = config.MONGODB_URL;

mongoose
  .connect(mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .catch(error => console.log(error.reason));

mongoose.connection.on("connected", () => {
  console.log("mongoose is connected!!!");
});

// app.get("/api/products", (req, res) => {
//   res.send(data.products);
// });
app.use("/api/products", productRoute);
app.use("/api/user", userRoute);

app.get("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const product = data.products.find(x => x._id === productId);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ msg: "product not found" });
  }
});

app.listen(5000, () => {
  console.log("server running on port 5000");
});
