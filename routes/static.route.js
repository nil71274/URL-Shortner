const express = require('express');
const path = require('path');
const URL = require('../backend/models/url.model');
const { restrictTo } = require('../backend/middlewares/auth.middleware');
const router = express.Router();

const staticPath = path.join(__dirname, 'views');
router.use(express.static(staticPath))

router.get('/', restrictTo(["USER", "ADMIN"]), async (req, res)=>{
    const urls = await URL.find({createdBy:req.user._id});
    res.render('home', {urls : urls})
});

router.get('/signup', (req, res)=>{
    res.render('signup');
});

router.get('/login', (req, res)=>{
    res.render('login');
});



module.exports = router;