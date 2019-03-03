const router = require('express').Router();
const AuthMiddleware = require('../middleware/auth.rules');
const DepartmentsController = require('../controllers').departments;

router.get('/:id', DepartmentsController.findById);
router.get('/', DepartmentsController.find);
router.post('/', AuthMiddleware.isAuthenticated, DepartmentsController.create);
router.put('/:id', AuthMiddleware.isAuthenticated, DepartmentsController.updateById);
router.delete('/:id', AuthMiddleware.isAuthenticated, DepartmentsController.deleteById);

module.exports = router;
