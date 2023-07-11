const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const LocalStorage = require("node-localstorage").LocalStorage;
const app = express();
const localStorage = new LocalStorage("./data/users");

app.use(bodyParser.json());
app.use(cors());

app.post("/users-create", async (req, res) => {
  const users = localStorage.getItem("users");
  const usersAdd = users ? JSON.parse(users) : [];
  usersAdd.push(req.body);
  localStorage.setItem("users", JSON.stringify(usersAdd));
  res.json({ users: "User успешно создано" });
});
app.get("/users", (req, res) => {
  res.send(JSON.parse(localStorage.getItem("users")));
});

app.listen(3002, () => {
  console.log(`Сервер запущен на порту 3002`);
});
