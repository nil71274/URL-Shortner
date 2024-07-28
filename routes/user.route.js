const express = require('express');
const { handleCreateUser,handleLoginUser, handleUserLogout } = require('../backend/controllers/user.controller');

const router = express.Router();

router.post('/', handleCreateUser);
router.post('/login', handleLoginUser);
router.get('/logout', handleUserLogout)

module.exports = router;