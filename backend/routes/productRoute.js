import express from "express";
import Product from "../models/productModel";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      brand: req.body.brand,
      price: req.body.price,
      rating: req.body.rating,
      description: req.body.description,
      numReviews: req.body.numReviews,
      countInStock: req.body.countInStock
    });
    const newProduct = await product.save();
    if (newProduct) {
      res.status(201).send({ msg: "new product created", data: newProduct });
    }
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);

  if (product) {
    product.name = req.body.name;
    product.image = req.body.image;
    product.category = req.body.category;
    product.brand = req.body.brand;
    product.price = req.body.price;
    product.rating = req.body.rating;
    product.description = req.body.description;
    product.numReviews = req.body.numReviews;
    product.countInStock = req.body.countInStock;

    const updatedProduct = await product.save();
    if (updatedProduct) {
      res
        .status(200)
        .send({ msg: "product updated successfully", data: updatedProduct });
    } else {
      res.status(500).send({ msg: "product not updated" });
    }
  }
});
router.delete("/:id", async (req, res) => {
  const deletedProduct = await Product.findById(req.params.id);
  if (deletedProduct) {
    await deletedProduct.remove();
    res.status(200).send({ msg: "product deleted" });
  } else {
    res.status(500).send({ msg: "product was not delete" });
  }
});

router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

export default router;
