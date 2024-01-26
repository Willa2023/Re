const express = require("express"); //import express.js framework
const mysql = require("mysql"); //import sql module for connect to database
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

router.get("/listByTopic/:topic", async (req, res) => {
  const { topic } = req.params;

  const sql = "SELECT * FROM articles WHERE topic = ?";
  db.query(sql, [topic], async (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (result.length > 0) {
        res.json(result);
      } else {
        res.status(404).json({ error: "Article not found" });
      }
    }
  });
});

router.get("/listByTitle/:title", async (req, res) => {
  const { title } = req.params;

  const sql = "SELECT * FROM articles WHERE title LIKE ? ";
  const searchTitle = `%${title}%`;

  db.query(sql, [searchTitle], async (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (result.length > 0) {
        res.json(result);
      } else {
        res.status(404).json({ error: "Article not found" });
      }
    }
  });
});

router.get("/getArticle/:articleId", async (req, res) => {
  const { articleId } = req.params;

  const sql = "SELECT * FROM articles WHERE id = ?";
  db.query(sql, [articleId], async (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (result.length > 0) {
        res.json(result[0]);
      } else {
        res.status(404).json({ error: "No article found for the given ID" });
      }
    }
  });
});

router.post("/createArticle", async (req, res) => {
  const title = req.body.title;
  const topic = req.body.topic;
  const author = req.body.author;
  const content = req.body.content;

  try {
    const sql =
      "INSERT INTO articles (title, topic, author, content) VALUES (?, ?, ?, ?)";
    db.query(sql, [title, topic, author, content], (error, result) => {
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

router.put("/updateArticle/:articleId", async (req, res) => {
  const { articleId } = req.params;
  const { title, topic, content } = req.body;

  const sql =
    "UPDATE articles SET title = ?, topic = ?, content = ? WHERE id = ?";
  db.query(sql, [title, topic, content, articleId], (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json({ success: true, message: "Article updated successfully" });
    }
  });
});

//show article by title
router.get("/showArticle/:title", async (req, res) => {
  const { title } = req.params;

  const sql = "SELECT * FROM articles WHERE title = ?";
  db.query(sql, [title], async (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (result.length > 0) {
        const article = result[0];
        res.json(article);
      } else {
        res.status(404).json({ error: "Article not found" });
      }
    }
  });
});

router.get("/personalPage/:author", async (req, res) => {
  const { author } = req.params;

  const sql = "SELECT * FROM articles WHERE author = ?";
  db.query(sql, [author], async (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (result.length > 0) {
        res.json(result);
      } else {
        res.status(404).json({ error: "No articles found for the author" });
      }
    }
  });
});

router.delete("/deleteArticle/:articleId", async (req, res) => {
  const articleId = req.params.articleId;

  try {
    const sqlDelete = "DELETE FROM articles WHERE id = ?";
    db.query(sqlDelete, [articleId], (error, result) => {
      if (error) {
        console.error("Error during article deletion:", error);
        res
          .status(500)
          .json({ success: false, message: "Error deleting the article" });
      } else {
        res.json({ success: true, message: "Article deleted successfully" });
      }
    });
  } catch (error) {
    console.error("Error during article deletion:", error);
    res
      .status(500)
      .json({ success: false, message: "Error deleting the article" });
  }
});

module.exports = app;
