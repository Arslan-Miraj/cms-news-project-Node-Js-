const mongoose = require('mongoose')

const userModel = require('../models/User.model')
const newsModel = require('../models/News.model')
const commentsModel = require('../models/Comments.model')
const categoryModel = require('../models/Category.model')



const index = async (req, res) => {
    res.render('../views/frontend/index')
}

const articlesByCategory = async (req, res) => {
    res.render('../views/frontend/category')
}

const singleArticle = async (req, res) => {
    res.render('../views/frontend/single')
}

const searchArticles = async (req, res) => {
    res.render('../views/frontend/search')
}

const articlesByAuthor = async (req, res) => {
    res.render('../views/frontend/author')
}

const addComment = async (req, res) => {
}

module.exports = {
    index, articlesByCategory, singleArticle, searchArticles, articlesByAuthor, addComment
}