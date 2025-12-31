const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/Users");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: ["mern-crud-app-delta-mocha.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  User.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json(err));
});

app.put("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate(
    { _id: id },
    { name: req.body.name, email: req.body.email, age: req.body.age }
  )
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.post("/createUser", async (req, res) => {
  try {
    console.log(req.body); // 👈 DEBUG LINE

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("CreateUser Error:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
