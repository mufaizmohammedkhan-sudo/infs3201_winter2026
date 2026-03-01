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
/**
 * Get shifts 
 * @param {string} empId
 * @returns {Promise<Array<{date:string,startTime:string,endTime:string,isMorning:boolean}>>}
 */
async function getEmployeeShifts(empId) {
  const assignments = await persistence.getAllAssignments();
  const shifts = await persistence.getAllShifts();


  const shiftIds = [];
  for (const a of assignments) {
    if (a.employeeId === empId) {
      shiftIds.push(a.shiftId);
    }
  }

  // collect shift obj
  const empShifts = [];
  for (const s of shifts) {
    if (shiftIds.includes(s.shiftId)) {
      empShifts.push({
        date: s.date,
        startTime: s.startTime,
        endTime: s.endTime,
        isMorning: isBeforeNoon(s.startTime)
      });
    }
  }

  // sort
  for (let i = 0; i < empShifts.length; i++) {
    for (let j = 0; j < empShifts.length - 1; j++) {
      const a = empShifts[j];
      const b = empShifts[j + 1];

      if (a.date > b.date || (a.date === b.date && a.startTime > b.startTime)) {
        empShifts[j] = b;
        empShifts[j + 1] = a;
      }
    }
  }

  return empShifts;
}

/**
 * Check if a time is before 12
 * @param {string} time
 * @returns {boolean}
 */
function isBeforeNoon(time) {
  const parts = time.split(":");
  const hour = Number(parts[0]);
  return hour < 12;
}

module.exports = {
  listEmployees,
  getEmployee,
  getEmployeeShifts   
};