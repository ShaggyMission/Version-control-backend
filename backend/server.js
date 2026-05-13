const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());


const topics = [
  {
    id: 1,
    title: "Antes del versionamiento",
    description: "Código enviado por USB, correo o archivos duplicados."
  },
  {
    id: 2,
    title: "Git",
    description: "Sistema distribuido de control de versiones."
  },
  {
    id: 3,
    title: "Conventional Commits",
    description: "Buenas prácticas para commits más claros."
  },
  {
    id: 4,
    title: "GitHub / GitLab / Bitbucket / SVN",
    description: "Plataformas para alojar repositorios."
  },
  {
    id: 5,
    title: "Git Flow vs Trunk Based",
    description: "Estrategias modernas de ramas."
  },
  {
    id: 6,
    title: "Versionamiento Semántico",
    description: "Formato MAJOR.MINOR.PATCH."
  },
  {
    id: 7,
    title: "CI/CD",
    description: "Automatización de build, test y deploy."
  },
  {
    id: 8,
    title: "Docker",
    description: "Empaqueta aplicación y dependencias."
  },
  {
    id: 9,
    title: "Kubernetes",
    description: "Escalabilidad y alta disponibilidad."
  },
  {
    id: 10,
    title: "GitOps",
    description: "Git como fuente única de verdad."
  }
];


app.get("/api/topics", (req, res) => {
  res.json(topics);
});


app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});