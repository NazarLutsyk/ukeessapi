const router = require('express').Router();
const UsersController = require('../controllers').users;
const AuthMiddleware = require('../middleware/auth.rules');

router.post('/register', AuthMiddleware.isNotAuthenticated, UsersController.register);
router.post('/login', AuthMiddleware.isNotAuthenticated, UsersController.login);
router.get('/principal', UsersController.principal);
router.get('/logout', AuthMiddleware.isAuthenticated, UsersController.logout);

module.exports = router;
