const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/Users");
require("dotenv").config();

const app = express();

// Improved CORS to handle your Vercel frontend
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      "https://mern-crud-frontend-plum.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// 1. Get All Users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 2. Get Single User (for Update page)
app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((user) => res.json(user))
    .catch((err) => res.status(404).json(err));
});

// 3. Create User - Changed to /create to match your CreateUser.jsx
app.post("/create", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Update User
app.put("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, { new: true })
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
});

// 5. Delete User
app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json(err));
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
