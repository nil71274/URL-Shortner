const shortid = require('shortid');
const URL = require('../models/url.model')

async function handleGenerateShortUrl(req, res){
    const url = req.body.url;
    if(!url) return res.status(400).json({error: 'URL not found'});
    
    const shortId = shortid();
    await URL.create({
        shortId: shortId,
        redirectUrl: url,
        visitHistory: [],
        createdBy: req.user._id
    });
    return res.redirect('/');
}

async function handleRedirect(req, res){
    const shortId = req.params.shortId;
    const result = await URL.findOneAndUpdate(
        {
            shortId,
        }, {
            $push:{
                visitHistory:{
                    timestamps: Date.now()
                },
            },
        },
    );
    res.redirect(result.redirectUrl)
}

module.exports = {
    handleGenerateShortUrl,
    handleRedirect,
}