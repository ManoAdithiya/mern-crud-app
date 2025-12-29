const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/Users");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb+srv://manoadithiya2002e_db_user:mano1005@cluster0.tzpprzl.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  User.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  User.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.delete('/deleteUser/:id',(req,res)=>{
  const id=req.params.id
  User.findByIdAndDelete({_id:id})
  .then(res=>res.json(res))
  .catch(err=>res.json(err))
})

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

app.listen(3001, () => {
  console.log("Server is Running on port 3001.");
});
