const express = require('express');
const router = express.Router();

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
router.get('/dashboard', dashboardPage)
router.get('/settings', settingsPage)


// User CRUD Routes
router.get('/users', allUser)
router.get('/add-user', addUserPage)
router.post('/add-user', addUser)
router.get('/update-user/:id', updateUserPage)
router.post('/update-user/:id', updateUser)
router.delete('/delete-user/:id', deleteUser)


// Category CRUD Routes
router.get('/category', allCategory)
router.get('/add-category', addCategoryPage)
router.post('/add-category', addCategory)
router.get('/update-category/:id', updateCategoryPage)
router.post('/update-category/:id', updateCategory)
router.get('/delete-category/:id', deleteCategory)


// Article CRUD Routes
router.get('/article', allArticle)
router.get('/add-article', addArticlePage)
router.post('/add-article', addArticle)
router.get('/update-article/:id', updateArticlePage)
router.post('/update-article/:id', updateArticle)
router.get('/delete-article/:id', deleteArticle)


// Comment Management Routes
router.get('/comments', allComments)


module.exports = router;
