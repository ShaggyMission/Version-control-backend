const express = require("express");
const cors = require("cors");
const topics = require("./data/topics");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/topics", (req, res) => {
  res.json(topics);
});

app.get("/api/topics/:id", (req, res) => {
  const topic = topics.find(t => t.id === parseInt(req.params.id));

  if (!topic) {
    return res.status(404).json({ message: "Tema no encontrado" });
  }

  res.json(topic);
});

module.exports = app;