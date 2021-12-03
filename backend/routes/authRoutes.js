const { Router } = require('express');
const authController = require('../controllers/authController');


const router = Router();

router.post('/signup', authController.signup);

router.post('/login', authController.login);

router.get('/isauth', authController.requireAuth);


router.get('/logout', authController.logout);

module.exports = router;