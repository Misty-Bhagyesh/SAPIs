const express = require('express');
const router = express.Router();
const { getToken, decodeToken } = require('../config/jwtToken');
const Category = require('../models.js/categories.model');
var multer = require('multer')
var multiparty = require('multiparty');
const { constants } = require('../config/constants');
let data;
const path = constants.server_root;
router.get('/getAllCategories', async (req, res) => {
    try {
        const categoryList = await Category.find();
        categoryList.forEach(element => {
            element.imagePath = path + element.imagePath;
        });
        res.status(200).json(categoryList);
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while getting the Categories."
        });
    }
});
router.get('/getById/:id', async (req, res) => {
    try {
        const categoryList = await Category.findById(req.params.id);
        categoryList.imagePath = path + categoryList.imagePath;
        res.status(200).json(categoryList);
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while getting the Categories."
        });
    }
});


router.put('/updateCategory/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const storage = multer.diskStorage({
            destination: (req, file, callback) => {
                callback(null, "uploads/images");
            },
            filename: (req, file, callback) => {
                data = '/uploads/images/' + file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[1];
                callback(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[1]);
            }
        });
        const upload = multer({ storage: storage }).single('file');
        upload(req, res, (err) => {
            if (err) {
                return res.status(400).send({
                    message: err
                });
            } else {
                try {
                    var form = new multiparty.Form();
                    form.parse(req, async (err, fields, files) => {
                        const categoryModel = {
                            name: req.body.name,
                            imagePath: data ? data : req.body.file
                        }
                        const options = { new: true };
                        const result = await Category.findByIdAndUpdate(id, categoryModel, options);
                        res.status(200).json({ status: 'success', message: 'Category update Successful!' });
                    });
                } catch (err) {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the Category."
                    });
                }
            }
        });

    } catch (err) {
        console.log(err);
    }
});
router.post('/deleteCategory/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Category.findByIdAndDelete(id);
        res.status(200).json({ message: `Category deleted successfully: ${id}` });
    } catch (err) {
        console.log(err);
    }
});
router.post('/addCategory/:name', async (req, res) => {
    // Validate request
    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, "uploads/images");
        },
        filename: (req, file, callback) => {
            data = '/uploads/images/' + file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[1];
            callback(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[1]);
        }
    });
    const upload = multer({ storage: storage }).single('file');
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            try {
                var form = new multiparty.Form();
                form.parse(req, async (err, fields, files) => {

                    const category = new Category({
                        name: req.params.name,
                        imagePath: data
                    });
                    const result = await category.save();
                    res.status(200).json({ status: 'success', message: 'Category added Successful!' });

                });
            } catch (err) {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Category."
                });
            }
        }
    });
});
module.exports = router;