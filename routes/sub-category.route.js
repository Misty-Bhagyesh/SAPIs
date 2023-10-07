const express = require('express');
const router = express.Router();
const SubCategory = require('../models.js/sub-category.model');
var multer = require('multer')
var multiparty = require('multiparty');
const { constants } = require('../config/constants');
let data;
const path = constants.server_root;
router.get('/getAllSubCategories', async (req, res) => {
    try {
        const categoryList = await SubCategory.find();
        // categoryList.forEach(element => {
        //     element.imagePath = path + element.imagePath;
        // });
        res.status(200).json(categoryList);
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while getting the SubCategories."
        });
    }
});
router.get('/getById/:id', async (req, res) => {
    try {   
        const categoryList = await SubCategory.findById(req.params.id);
        res.status(200).json(categoryList);
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while getting the SubCategory."
        });
    }
});
router.get('/getSubCategoryByCatId/:id', async (req, res) => {
    try {
        const categoryList = await SubCategory.find({ categoryId: req.params.id });
        res.status(200).json(categoryList);
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while getting the SubCategory."
        });
    }
});


router.put('/updateSubCategory/:id', async (req, res) => {
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
                            categoryId: req.body.categoryId,
                            imagePath: data ? data : req.body.file
                        }
                        const options = { new: true };
                        const result = await SubCategory.findByIdAndUpdate(id, categoryModel, options);
                        res.status(200).json({ status: 'success', message: 'SubCategory update Successful!' });
                    });
                } catch (err) {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the SubCategory."
                    });
                }
            }
        });

    } catch (err) {
        console.log(err);
    }
});
router.post('/deleteSubCategory/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await SubCategory.findByIdAndDelete(id);
        res.status(200).json({ message: `SubCategory deleted successfully: ${id}` });
    } catch (err) {
        console.log(err);
    }
});
router.post('/addSubCategory/:name', async (req, res) => {
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

                    const category = new SubCategory({
                        name: req.params.name,
                        imagePath: data,
                        categoryId: req.body.categoryId
                    });
                    const result = await category.save();
                    res.status(200).json({ status: 'success', message: 'SubCategory added Successful!' });

                });
            } catch (err) {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the SubCategory."
                });
            }
        }
    });
});
module.exports = router;