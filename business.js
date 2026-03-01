// business.js  (Business Logic Layer)

const persistence = require("./persistence");

/**
 * Get all employees
 * @returns {Promise<Array<{employeeId:string,name:string,phone:string}>>}
 */
async function listEmployees() {
  return await persistence.getAllEmployees();
}

/**
 * Get one employee by ID
 * @param {string} empId
 * @returns {Promise<{employeeId:string,name:string,phone:string}|undefined>}
 */
async function getEmployee(empId) {
  return await persistence.findEmployee(empId);
}

module.exports = {
  listEmployees,
  getEmployee
};