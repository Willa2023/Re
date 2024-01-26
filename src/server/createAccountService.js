const express = require("express"); //import express.js framework
const mysql = require("mysql"); //import sql module for connect to database
const bcrypt = require("bcrypt"); //import bcrypt library to encrypt password by hash method
const router = express.Router(); //create an instance of an Express Router

const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 205,
  })
);
app.use(express.json());
app.use("/", router);

const db = mysql.createConnection({
  host: "reactblogdatabase.cf8sld5urrxi.ap-southeast-2.rds.amazonaws.com",
  user: "admin",
  password: "willawilla",
  database: "message",
});
db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Database Connected");
  }
});

router.post("/createAccount", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  try {
    const hashPassword = await bcrypt.hash(password, 10); //asynchronous operation
    const sql =
      "INSERT INTO accounts (username, password, email) VALUES (?, ?, ?)";
    db.query(sql, [username, hashPassword, email], (error, result) => {
      if (error) {
        res.json(error);
      } else {
        res.json({ code: 200, status: "Data inserted into the database" });
      }
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const sql = "SELECT * FROM accounts WHERE username = ?";
  db.query(sql, [username], async (error, result) => {
    if (error) {
      console.error(error);
      res.json(error);
    } else {
      if (result.length > 0) {
        const storeHashPassword = result[0].password;

        try {
          const passwordMatch = await bcrypt.compare(
            password,
            storeHashPassword
          );
          if (passwordMatch) {
            res.json({ code: 200, status: "Login successful" });
          } else {
            res.json({ code: 401, status: "Invalid username or password" });
          }
        } catch (compareError) {
          console.error(compareError);
          res.sendStatus(500);
        }
      } else {
        res.json({ code: 401, status: "Invalid username or password" });
      }
    }
  });
});

module.exports = app;
