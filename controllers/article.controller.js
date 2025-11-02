// const mongoose = require('mongoose') => Already included in model files
const articleModel = require('../models/News.model')


const allArticle = async (req, res) => {
    res.render('admin/articles/article', { role: req.role })
}

const addArticlePage = async (req, res) => {
    
}


const addArticle = async (req, res) => {
    
}


const updateArticlePage = async (req, res) => {
    
}


const updateArticle = async (req, res) => {
    
}


const deleteArticle = async (req, res) => {
    
}



module.exports = {
    allArticle, addArticlePage, addArticle, updateArticlePage, updateArticle, deleteArticle
}

