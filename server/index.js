import express, { urlencoded } from "express";
import * as dotenv from "dotenv";
import { hash, compare } from "bcrypt";
// import { MongoClient } from "mongodb";
import mongoose from "mongoose";
// const saltRounds = 10;

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to MongoDB");
});
const client = mongoose.connection;

app.get("/", async (req, res) => {
  res.send("hello world");
});

app.post("/signup", async (req, res) => {
  const db = client.useDb("mydatabase");
  const collection = db.collection("users");
  const result = await collection.findOne({ email: req.body.myemail });

  if (!result) {
    try {
      const hasedpassword = await hash(req.body.mypassword, saltRounds);
      await collection.insertOne({
        name: req.body.myname,
        email: req.body.myemail,
        password: hasedpassword,
      });
    } catch (e) {
      console.error(e);
    }
  } else {
    console.log("user already exists");
    // return res.status(208).send("user already exists");
  }
  //   client.close();
  //   res.redirect("/login");
});

app.post("/signin", async function (req, res) {
  const db = client.useDb("mydatabase");
  const collection = db.collection("users");
  const result = await collection.findOne({ email: req.body.myemail });

  if (result) {
    const password = req.body.mypassword;
    const hasedpassword = result.password;
    const isPasswordCorrect = await compare(password, hasedpassword);

    if (isPasswordCorrect) {
      res.redirect("/");
    } else {
      console.log("password is incorrect");
      //   res.redirect("/login");
    }
  } else {
    console.log("user dosen't exists");
    // res.redirect("/login");
  }
  client.close();
});

// app.get("/register", (req, res) => {
//   res.sendFile(__dirname + "/templates/signup.html");
// });

// app.get("/login", (req, res) => {
//   res.sendFile(__dirname + "/templates/signin.html");
// });

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
