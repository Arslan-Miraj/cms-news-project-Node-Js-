const express = require('express');
const router = express.Router();



// Importing contoller functions
const {
    index, articlesByCategory, singleArticle, searchArticles, articlesByAuthor, addComment
} = require('../controllers/site.controller')

// New Method
// const site = require('../controllers/site.controller') .... file_name = require(path)
// router.get('/', site.index())

router.get('/', index)
router.get('/category/:name', articlesByCategory)
router.get('/single/:id', singleArticle)
router.get('/search', searchArticles)
router.get('/author/:name', articlesByAuthor)
router.get('/add-comment', addComment)


module.exports = router;
