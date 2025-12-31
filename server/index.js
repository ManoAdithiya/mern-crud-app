const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/Users"); // Ensure path is ./models/Users
require("dotenv").config();

const app = express();

// FIX 1: Flexible CORS to allow your specific Vercel URL and all Vercel subdomains
app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = [
        "https://mern-crud-frontend-plum.vercel.app",
        "https://mern-crud-frontend-ky65ik5ce-mano-adithyas-projects.vercel.app",
      ];
      if (
        !origin ||
        allowed.includes(origin) ||
        origin.endsWith(".vercel.app")
      ) {
        callback(null, true);
      } else {
        callback(new Error("CORS blocked"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => res.send("Server is running"));

app.post("/api/create", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/api/getUser/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.put("/api/updateUser/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete("/api/deleteUser/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User Deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
