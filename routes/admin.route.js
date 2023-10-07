const express = require('express');
const router = express.Router();
const { getToken, decodeToken } = require('../config/jwtToken');
const Admin = require('../models.js/admin.model');

router.post('/login', async (req, res) => {
    try {
        const reqQuery = { email: req.body.email, password: req.body.password };
        Admin.findOne(reqQuery).then(async (result) => {
            if (result) {
                result['token'] = getToken(result._id)
                res.status(200).json({ status: 'success', message: 'Login Successful!', data: result });
            } else {
                res.status(400).json({ status: 'Error', message: 'Wrong email or password!' });
            }
        });
    } catch (err) {
        res.status(500).send({
            message: "Something want to wrong."
        });
    }
});
module.exports = router;