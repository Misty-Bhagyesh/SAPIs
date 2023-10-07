// const express = require('express');
// const router = express.Router();
// router.get('/users/getAll', async (req, res) => {
//     try {
//         const userList = await Users.find();
//         res.status(200).json(userList);
//     } catch (err) {
//         console.log(err);
//     }
// });

// router.post('/users/add', async (req, res) => {
//     try {
//         const user = new Users({
//             name: req.body.name,
//             age: req.body.age
//         });
//         const result = await user.save();
//         res.status(200).json(result);
//     } catch (err) {
//         console.log(err);
//     }
// });
// router.get('/users/getById/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const result = await Users.findById(id);
//         res.status(200).json(result);
//     } catch (err) {
//         console.log(err);
//     }
// })

// router.put('/users/update/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const user = req.body;
//         const options = { new: true };
//         const result = await Users.findByIdAndUpdate(id, user, options);
//         res.status(200).json(result);
//     } catch (err) {
//         console.log(err);
//     }
// });
// router.delete('/users/delete/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const result = await Users.findByIdAndDelete(id);
//         res.status(200).json({message:`User deleted successfully: ${id}`});
//     } catch (err) {
//         console.log(err);
//     }
// })

// module.exports = router;