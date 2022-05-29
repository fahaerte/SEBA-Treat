import express from "express";

const app: express.Application = express();

app.get("/", (req, res) => {
  res.send("It works!");
});

app.listen(5000, () => {
  console.log("Application is listening on port 5000");
});
