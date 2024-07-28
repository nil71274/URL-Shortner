const express = require('express');
const { handleViewAll, handleAdminLogout } = require('../backend/controllers/admin.controller');

const router = express.Router();


router.get('/',handleViewAll);
router.get('/logout', handleAdminLogout);


module.exports = router;