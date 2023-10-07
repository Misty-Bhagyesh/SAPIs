const port = process.env.PORT || 8000;
const cors = require('cors');
const express = require('express');
const app = express(); // middleware
const connect = require('./data/connection');
const usersRoute = require('./routes/users.route');
const adminRoute = require('./routes/admin.route');
const categoryRoute = require('./routes/categories.route')
const subCategoryRoute = require('./routes/sub-category.route')

connect();
app.use(express.json());
app.use(cors());
// app.use('/', express.static(__dirname + '/public'));
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Scrappi api." });
});
app.use('/api/users', usersRoute);
app.use('/api/admin', adminRoute);
app.use('/api/category', categoryRoute);
app.use('/api/subCategory', subCategoryRoute);
app.set('/public', express.static("public"));
app.use('/uploads', express.static('uploads'));
app.listen(port, () => {
    console.log(`Our app is running at port ${port}`);
})