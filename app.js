const express = require("express");
const { engine } = require("express-handlebars");
const business = require("./business");

const app = express();
//handlebar
app.use(express.urlencoded({ extended: false }));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");


// Land page

app.get("/", async (req, res) => {
  const employees = await business.listEmployees();
  res.render("landing", { employees });
});


//emplye details
app.get("/employee/:id", async (req, res) => {
  const empId = req.params.id;

  const employee = await business.getEmployee(empId);

  if (!employee) {
    return res.send("Employee not found");
  }
  app.get("/employee/:id/edit", async (req, res) => {
  const empId = req.params.id;
  const employee = await business.getEmployee(empId);

  if (!employee) {
    return res.send("Employee not found");
  }

  res.render("editEmployee", { employee });
});

  const shifts = await business.getEmployeeShifts(empId);

  res.render("employee", {
    employee,
    shifts
  });
});
app.post("/employee/:id/edit", async (req, res) => {

  const empId = req.params.id;

  const name = (req.body.name || "").trim();
  const phone = (req.body.phone || "").trim();

  // validation
  if (name.length === 0) {
    return res.send("Validation error: name cannot be empty");
  }

  const phoneRegex = /^\d{4}-\d{4}$/;
  if (!phoneRegex.test(phone)) {
    return res.send("Validation error: phone must be ####-####");
  }

  const result = await business.updateEmployee(empId, name, phone);

  if (result !== "OK") {
    return res.send(result);
  }

  // PRG redirect
  res.redirect("/");
});



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});