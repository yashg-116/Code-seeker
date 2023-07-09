const asyncHandler = require("express-async-handler");
const getResponse = require('./getResponse')

const cf = asyncHandler( async(req, res) => {
    const url = "https://kontests.net/api/v1/codeforces";
    const response = await getResponse(url);
    res.status(200).json(response);
});

const ac = asyncHandler( async(req, res) => {
    const url = "https://kontests.net/api/v1/at_coder";
    const response = await getResponse(url);
    res.status(200).json(response);
});

const cc = asyncHandler( async(req, res) => {
    const url = "https://kontests.net/api/v1/code_chef";
    const response = await getResponse(url);
    res.status(200).json(response);
});

module.exports = {cf, ac, cc}