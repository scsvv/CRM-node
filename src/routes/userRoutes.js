const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, userController.getUser);
router.put('/', authMiddleware, userController.updateUser);
router.put('/password', authMiddleware, userController.updatePassword);
router.delete('/', authMiddleware, userController.deleteUser);

module.exports = router;