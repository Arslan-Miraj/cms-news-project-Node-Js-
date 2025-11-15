const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const isAdmin = require('../middlewares/isAdmin');
const upload = require('../middlewares/multer')


// Validation Middlewares
const validation = require('../middlewares/validation');

// Importing contoller functions
const {
    loginPage, adminLogin, logout, allUser, addUserPage, addUser, updateUserPage, updateUser, deleteUser, dashboardPage, settingsPage, saveSettings
} = require('../controllers/user.controller')

const {
    allCategory, addCategoryPage, addCategory, updateCategoryPage, updateCategory, deleteCategory
} = require('../controllers/category.controller')

const {
    allArticle, addArticlePage, addArticle, updateArticlePage, updateArticle, deleteArticle
} = require('../controllers/article.controller')

const {
    allComments
} = require('../controllers/comment.controller')





// Login Route Handlers
router.get('/', loginPage)
router.post('/index', validation.loginValidationRules, adminLogin)
router.get('/logout', logout)
router.get('/dashboard', isLoggedIn,  dashboardPage)
router.get('/settings', isLoggedIn, isAdmin, settingsPage)
router.post('/settings', isLoggedIn, isAdmin, upload.single('website_logo'), saveSettings)


// User CRUD Routes
router.get('/users', isLoggedIn, isAdmin, allUser)
router.get('/add-user', isLoggedIn, isAdmin, addUserPage)
router.post('/add-user', isLoggedIn, isAdmin, validation.userValidationRules, addUser)
router.get('/update-user/:id', isLoggedIn, isAdmin, updateUserPage)
router.post('/update-user/:id', isLoggedIn, isAdmin, updateUser)
router.delete('/delete-user/:id', isLoggedIn, isAdmin, deleteUser)


// Category CRUD Routes
router.get('/category', isLoggedIn, isAdmin, allCategory)
router.get('/add-category', isLoggedIn, isAdmin, addCategoryPage)
router.post('/add-category', isLoggedIn, isAdmin, addCategory)
router.get('/update-category/:id', isLoggedIn, isAdmin, updateCategoryPage)
router.post('/update-category/:id', isLoggedIn, isAdmin, updateCategory)
router.delete('/delete-category/:id', isLoggedIn, isAdmin, deleteCategory)


// Article CRUD Routes
router.get('/article', isLoggedIn, allArticle)
router.get('/add-article', isLoggedIn, addArticlePage)
router.post('/add-article', isLoggedIn, upload.single('image'), addArticle)
router.get('/update-article/:id', isLoggedIn, updateArticlePage)
router.post('/update-article/:id', isLoggedIn, upload.single('image'), updateArticle)
router.delete('/delete-article/:id', isLoggedIn, deleteArticle)


// Comment Management Routes
router.get('/comments', isLoggedIn, allComments)


// Route Handler Middleware
router.use(isLoggedIn, (req, res, next) => {
    res.status(404).render('admin/404', { message: '404 Not Found', role: req.role});
});

router.use(isLoggedIn, (err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.status || 500;
    if (statusCode === 403) {
        return res.status(403).render('admin/403', { message: err.message || 'Forbidden', role: req.role});
    } else if (statusCode === 404) {
        return res.status(404).render('admin/404', { message: err.message || 'Not Found', role: req.role});
    } else if (statusCode === 500) {
        return res.status(500).render('admin/500', { message: err.message || 'Internal Server Error', role: req.role});
    }
    // const view = statusCode === 404 ? 'admin/404' : 'admin/500';
    res.status(statusCode).render(view, { message: err.message || 'Something went wrong', role: req.role});
});


module.exports = router;
