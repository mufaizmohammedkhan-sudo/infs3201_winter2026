const prompt = require("prompt-sync")();
const business = require("./business");

console.log("presentation.js started ✅");

async function main() {
  let choice;

  do {
    console.log("\n==== Employee Scheduling System ====");
    console.log("1. View All Employees");
    console.log("2. Find Employee");
    console.log("3. Exit");

    choice = prompt("Enter your choice: ").trim();

    if (choice === "1") {
      const employees = await business.listEmployees();

      console.log("\n--- Employees ---");
      for (const e of employees) {
        console.log(`${e.employeeId} | ${e.name} | ${e.phone}`);
      }
    }

    else if (choice === "2") {
      const id = prompt("Enter Employee ID: ").trim();
      const emp = await business.getEmployee(id);

      if (!emp) console.log("Employee not found.");
      else console.log(`${emp.employeeId} | ${emp.name} | ${emp.phone}`);
    }

    else if (choice === "3") {
      console.log("Exiting...");
    }

    else {
      console.log("Invalid choice.");
    }

  } while (choice !== "3");
}

main().catch(err => console.error(err));