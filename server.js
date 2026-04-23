const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Fix for homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

let orders = [];

app.post("/order", async (req, res) => {
  const { name, item } = req.body;

  if (!name || !item) {
    return res.json({ msg: "Please enter all details" });
  }

  await Order.create({ name, item });

  res.json({ msg: "Order saved in DB!" });
});
app.get("/orders", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/cafeDB")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Schema
const Order = mongoose.model("Order", {
  name: String,
  item: String
});