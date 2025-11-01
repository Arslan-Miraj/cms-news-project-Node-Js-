const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
// const session = require('express-session');
const cookieParser = require('cookie-parser');
const connectFlash = require('connect-flash');
require('dotenv').config();

// Middlewares and configurations
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(expressLayouts)
app.use(cookieParser());

// Frontend Layouts
app.set('layout', 'frontend/layout')



// View Engine
app.set('view engine', 'ejs');


// Database
const MONGO_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/news-cms-blog';
mongoose.connect(MONGO_URL);


// Routes
app.use('/', require('./routes/frontend.route'));

app.use('/admin', (req, res, next) => {
    res.locals.layout = 'admin/layout';
    next();
})
app.use('/admin', require('./routes/backend.route'));


const PORT = process.env.PORT || 3000;
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
