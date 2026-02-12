// presentation.js (Presentation Layer)
const prompt = require("prompt-sync")();
const business = require("./business");

console.log("presentation.js started");

async function main() {
  let choice;

  do {
    console.log("\n==== Employee Scheduling System ====");
    console.log("1. View All Employees");
    console.log("2. Find Employee");
    console.log("3. Schedule Employee");
    console.log("4. Exit");

    choice = prompt("Enter your choice: ").trim();

    if (choice === "1") {
      const employees = await business.listEmployees();
      console.log("\n--- Employees ---");
      for (const e of employees) {
        console.log(`${e.employeeId} | ${e.name} | ${e.phone}`);
      }
    }

    else if (choice === "2") {
      const id = prompt("Enter Employee ID (example E001): ").trim();
      const emp = await business.getEmployee(id);

      if (!emp) {
        console.log("Employee not found.");
      } else {
        console.log("\n--- Employee ---");
        console.log(`ID   : ${emp.employeeId}`);
        console.log(`Name : ${emp.name}`);
        console.log(`Phone: ${emp.phone}`);
      }
    }

    else if (choice === "3") {
      const empId = prompt("Employee ID (example E001): ").trim();
      const shiftId = prompt("Shift ID (example S001): ").trim();

      const result = await business.scheduleEmployee(empId, shiftId);
      console.log(result);
    }

    else if (choice === "4") {
      console.log("Exiting program...");
    }

    else {
      console.log("Invalid choice.");
    }

  } while (choice !== "4");
}

main().catch(err => console.error(err));
