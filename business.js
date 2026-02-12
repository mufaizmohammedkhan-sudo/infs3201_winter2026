// business.js  (Business Logic Layer)

const persistence = require("./persistence");
const fs = require("fs/promises");

/**
 * Return all employees
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
 * computeShiftDuration(startTime, endTime)
 * LLM: ChatGPT i usedd to generate this and get this so documenting it early on 
 * Prompt used:
 * "Write a javascript function that accepts two times in HH:MM format
 * and returns the number of hours between them as a decimal number."
 */
function computeShiftDuration(startTime, endTime) {
  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);

  const startMinutes = sh * 60 + sm;
  const endMinutes = eh * 60 + em;

  return (endMinutes - startMinutes) / 60;
}

/**
 * Schedule employee while enforcing daily hour limit
 * @param {string} empId
 * @param {string} shiftId
 * @returns {Promise<string>}
 */
async function scheduleEmployee(empId, shiftId) {

  const emp = await persistence.findEmployee(empId);
  if (!emp) return "Employee not found";

  const shifts = await persistence.getAllShifts();
  const shift = shifts.find(s => s.shiftId === shiftId);
  if (!shift) return "Shift not found";

  const raw = await fs.readFile("config.json", "utf8");
  const config = JSON.parse(raw);

  const newHours =
    computeShiftDuration(shift.startTime, shift.endTime);

  const assignments = await persistence.getAllAssignments();

  let totalHours = 0;

  for (const a of assignments) {
    if (a.employeeId === empId) {
      const s = shifts.find(x => x.shiftId === a.shiftId);
      if (s && s.date === shift.date) {
        totalHours += computeShiftDuration(
          s.startTime,
          s.endTime
        );
      }
    }
  }

  if (totalHours + newHours > config.maxDailyHours) {
    return "Daily hour limit exceeded";
  }

  await persistence.addAssignment(empId, shiftId);
  return "Scheduled successfully";
}

module.exports = {
  listEmployees,
  getEmployee,
  scheduleEmployee
};
