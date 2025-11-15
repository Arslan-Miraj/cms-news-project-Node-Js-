// const mongoose = require('mongoose') => Already included in model files
const articleModel = require('../models/News.model')
const categoryModel = require('../models/Category.model')
const createError = require('../utils/error-message');

const fs = require('fs');
const path = require('path');


const allArticle = async (req, res, next) => {
    try {
        let articles;
        if (req.role === 'admin') {
            articles = await articleModel.find().populate('category', 'name').populate('author', 'full_name');
        }
        else {
            articles = await articleModel.find({ author: req.id }).populate('category', 'name').populate('author', 'full_name');
        }
        // res.json(articles)
        res.render('admin/articles/article', { role: req.role, articles })
    }
    catch (error) {
        // console.log(error)
        // res.status(500).render('admin/500', { message: error.message || 'Internal Server Error', role: req.role});
        next(error);
    }
    
}

const addArticlePage = async (req, res) => {
    const categories = await categoryModel.find();
    res.render('admin/articles/add-article', { role: req.role, categories })
}


const addArticle = async (req, res, next) => {
    try {
        const { title, content, category } = req.body;
        console.log(title)
        const image = req.file ? req.file.filename : null;

        const newArticle = new articleModel({
            title,
            content,
            category,
            author: req.id,
            image
        });

        await newArticle.save();
        res.redirect('/admin/article')
    }
    catch (error) {
        next(error);
    }
    
}


const updateArticlePage = async (req, res, next) => {
    try {
        const article = await articleModel.findById(req.params.id).populate('category', 'name');
        if (!article) {
            // return res.status(404).send('Article Not Found');
            const error = new Error('Article Not Found');
            error.status = 404;
            return next(error);
        }

        if (req.role == 'author'){
            if (req.id != article.author._id){
                // return  res.status(403).send('Forbidden');
                // const error = new Error('Forbidden');
                // error.status = 403;
                // return next(error);
                return next(createError('Forbidden', 403));
            }

        }

        const categories = await categoryModel.find()
        // res.json(categories)
        res.render('admin/articles/update-article', { role: req.role, article, categories })
    }
    catch (error) {
        next(error);
    }
    
}


const updateArticle = async (req, res, next) => {
    try {
        const { title, content, category } = req.body;
        const image = req.file ? req.file.filename : null;

        const article = await articleModel.findById(req.params.id);
        if (!article) {
            return next(createError('Article Not Found', 404));
        }

        if (req.role == 'author'){
            if (req.id != article.author._id){
                return next(createError('Forbidden', 403));
            }
        }

        article.title = title;
        article.content = content;
        article.category = category;    
        if (image) {
            // Delete old image file
            if (article.image) {
                const oldImagePath = path.join(__dirname, '../public/uploads', article.image);
                fs.unlinkSync(oldImagePath);
            }
            article.image = image;
        }

        await article.save();
        res.redirect('/admin/article')
    }
    catch (error) {
        next(error);
    }
}


const deleteArticle = async (req, res, next) => {
    try {
        const article = await articleModel.findById(req.params.id);

        if (!article) {
            return next(createError('Article Not Found', 404));
        }

        if (req.role == 'author'){
            if (req.id != article.author._id){
                return next(createError('Forbidden', 403));
            }
        }

        try {
            const oldImagePath = path.join(__dirname, '../public/uploads', article.image);
            fs.unlinkSync(oldImagePath);
        } catch (error) {
            console.log('Image not found or already deleted.');
        }
        
        await article.deleteOne();
        return res.json({success: true })
    }
    catch (error) {
        next(error);
    }
}



module.exports = {
    allArticle, addArticlePage, addArticle, updateArticlePage, updateArticle, deleteArticle
}

