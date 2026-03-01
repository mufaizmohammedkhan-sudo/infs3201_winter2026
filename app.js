const express = require("express");
const { engine } = require("express-handlebars");
const business = require("./business");

const app = express();
//handlebar
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


  const shifts = await business.getEmployeeShifts(empId);

  res.render("employee", {
    employee,
    shifts
  });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});