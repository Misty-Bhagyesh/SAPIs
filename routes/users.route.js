const express = require('express');
const router = express.Router();
const Users = require('../models.js/user.model');
const OTP = require('../models.js/otp.model');
const { sendOtp } = require('../config/sendOTP');
const { getToken, decodeToken } = require('../config/jwtToken');

router.get('/getuserDetailsByToken', async (req, res) => {
    const token = await decodeToken(req, res);
    Users.findById(token._id).then(result => {
        if (result) {
            res.status(200).json({ status: 'success', message: 'Fetch user details successful.', data: result });
        } else {
            res.status(400).send({
                message: "No user found."
            });
        }
    })
});
router.get('/getAll', async (req, res) => {
    try {
        const userList = await Users.find();
        res.status(200).json(userList);
    } catch (err) {
        console.log(err);
    }
});
router.post('/createUser', async (req, res) => {
    try {
        const user = new Users(req.body);
        const result = await user.save();
        res.status(200).json({ status: 'success', message: 'Registartion Successful!' });
    } catch (err) {
        console.log(err);
    }
});
router.post('/sendOtp', async (req, res) => {
    try {
        const mobile = req.body.mobile;
        const otp = sendOtp();
        const filter = { mobile: mobile };
        const updateData = { otp: otp, createdAt: new Date() }
        OTP.findOneAndUpdate(filter, updateData).then(async (result) => {
            if (result) {
                res.status(200).json({ status: 'success', message: 'OTP Sent Successful!', otp: otp });
            } else {
                const otpData = new OTP(req.body);
                otpData.otp = sendOtp();
                otpData.createdAt = new Date();
                const otpRes = await otpData.save();
                res.status(200).json({ status: 'success', message: 'OTP Sent Successful!', data: otpRes });
            }
        });
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while send OTP."
        });
    }
})
router.post('/loginWithOtp', async (req, res) => {
    try {
        // const user = new Users(req.body);
        const otpQuery = { otp: req.body.otp };
        // console.log(query);
        OTP.findOne(otpQuery).then(async (otpResult) => {
            if (otpResult) {
                const mobileQuery = { mobile: otpResult.mobile };
                Users.findOne(mobileQuery).then(async (result) => {
                    if (result) {
                        result['token'] = getToken(result._id)
                        console.log(result)
                        res.status(200).json({ status: 'success', message: 'Login Successful!', data: result });
                    } else {
                        const user = new Users();
                        user.mobile = otpResult.mobile;
                        user.first_name = '';
                        user.last_name = '';
                        user.email = '';
                        user.address_line1 = '';
                        user.address_line2 = '';
                        user.state = '';
                        user.city = ''; const userRes = user.save();
                        console.log(userRes);
                        user.token = getToken(user._id)
                        res.status(200).json({ status: 'success', message: 'Login Successful!', data: user });
                    }
                });
            } else {
                res.status(500).send({
                    message: "Something want to wrong."
                });
            }
        })
        // Users.findOne(query).then(async (result) => {
        //     if (result) {

        //     } else {
        //         res.status(200).json({ status: 'success', message: 'OTP Sent Successful!', data: { otp: sendOtp() } });
        //     }
        // }).catch(err => {
        //     res.status(500).send({
        //         message:
        //             err.message || "Some error occurred while send OTP."
        //     });
        // });
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Something want to wrong."
        });
    }
});


module.exports = router;
