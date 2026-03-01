const express = require("express");
const { engine } = require("express-handlebars");
const business = require("./business");

const app = express();

// Handlebars setup
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// Landing page: list employee names
app.get("/", async (req, res) => {
  const employees = await business.listEmployees();
  res.render("landing", { employees });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
