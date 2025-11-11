const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const isAdmin = require('../middlewares/isAdmin');
const upload = require('../middlewares/multer')

// Importing contoller functions
const {
    loginPage, adminLogin, logout, allUser, addUserPage, addUser, updateUserPage, updateUser, deleteUser, dashboardPage, settingsPage
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
router.post('/index', adminLogin)
router.get('/logout', logout)
router.get('/dashboard',isLoggedIn,  dashboardPage)
router.get('/settings',isLoggedIn, isAdmin, settingsPage)


// User CRUD Routes
router.get('/users', isLoggedIn, isAdmin, allUser)
router.get('/add-user', isLoggedIn, isAdmin, addUserPage)
router.post('/add-user', isLoggedIn, isAdmin, addUser)
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


module.exports = router;
