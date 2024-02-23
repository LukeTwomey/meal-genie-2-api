import pg from "pg";
import express from "express";
import cors from "cors";

const pool = new pg.Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recipes", async (req, res) => {
  const recipe = req.body;

  await pool.query(
    `INSERT INTO recipes(name) VALUES('${recipe.name}') RETURNING *`,
    (error, result) => {
      if (error) {
        throw error;
      }

      console.log(result);
      console.log(result.rows);

      res.send(result.rows);
    }
  );
});

app.get("/recipes", async (req, res) => {
  await pool.query("SELECT * FROM recipes", (error, results) => {
    if (error) {
      throw error;
    }

    res.send(results.rows);
  });
});

app.listen(process.env.PORT || 8081, function () {
  console.log("App listening on: ", process.env.PORT || 8081);
});
