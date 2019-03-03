const DepartmentsController = require('./departments.controller');
const EmployeesController = require('./employees.controller');
const UsersController = require('./users.controller');

const controllers = {};

controllers.departments = DepartmentsController;
controllers.employees = EmployeesController;
controllers.users = UsersController;

module.exports = controllers;
