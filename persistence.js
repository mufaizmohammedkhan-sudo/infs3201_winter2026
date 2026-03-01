// persistence.js (Persistence Layer)
const fs = require("fs/promises");

/**
 * returns all emplyees
 * @returns {Promise<Array<{employeeId:string,name:string,phone:string}>>}
 */
async function getAllEmployees() {
  const raw = await fs.readFile("employees.json", "utf8");
  return JSON.parse(raw);
}

/**
 * find employe with the id
 * @param {string} empId
 * @returns {Promise<{employeeId:string,name:string,phone:string}|undefined>}
 */
async function findEmployee(empId) {
  const list = await getAllEmployees();
  return list.find(e => e.employeeId === empId);
}

/**
 * retrns all shifts
 * @returns {Promise<Array<{shiftId:string,date:string,startTime:string,endTime:string}>>}
 */
async function getAllShifts() {
  const raw = await fs.readFile("shifts.json", "utf8");
  return JSON.parse(raw);
}

/**
 * @returns {Promise<Array<{employeeId:string,shiftId:string}>>}
 */
async function getAllAssignments() {
  const raw = await fs.readFile("assignments.json", "utf8");
  return JSON.parse(raw);
}

/**
 * @param {string} empId
 * @param {string} shiftId
 * @returns {Promise<void>}
 */
async function addAssignment(empId, shiftId) {
  const list = await getAllAssignments();
  list.push({ employeeId: empId, shiftId: shiftId });
  await fs.writeFile("assignments.json", JSON.stringify(list, null, 4));
}

module.exports = {
  getAllEmployees,
  findEmployee,
  getAllShifts,
  getAllAssignments,
  addAssignment,
};
