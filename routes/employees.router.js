const router = require('express').Router();
const EmployeesController = require('../controllers').employees;
const AuthMiddleware = require('../middleware/auth.rules');

router.get('/:id', EmployeesController.findById);
router.get('/', EmployeesController.find);
router.post('/', AuthMiddleware.isAuthenticated, EmployeesController.create);
router.put('/:id', AuthMiddleware.isAuthenticated, EmployeesController.updateById);
router.delete('/:id', AuthMiddleware.isAuthenticated, EmployeesController.deleteById);

module.exports = router;
