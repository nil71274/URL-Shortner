const express = require('express');
const {handleGenerateShortUrl,
    handleRedirect,
    // handleGetMyUrls
} = require('../backend/controllers/url.controller');

const router = express.Router();

// router.get('/', handleGetMyUrls);
router.post('/', handleGenerateShortUrl);
router.get('/:shortId', handleRedirect);

module.exports = router;