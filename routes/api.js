const DepartmentsRouter = require('./departments.router');
const EmployeesRouter = require('./employees.router');
const UsersRouter = require('./users.router');

const router = require('express').Router();

router.use('/departments', DepartmentsRouter);
router.use('/employees', EmployeesRouter);
router.use('/users', UsersRouter);

module.exports = router;
