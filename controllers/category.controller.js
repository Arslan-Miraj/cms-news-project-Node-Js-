const categoryModel = require('../models/Category.model')
const createError = require('../utils/error-message');
const { validationResult } = require('express-validator');


const allCategory = async (req, res) => {
    const categories =  await categoryModel.find();
    res.render('admin/categories/category', { categories, role: req.role })
}

const addCategoryPage = async (req, res) => {
    res.render('admin/categories/add-category', { role: req.role, errors: 0 })
}


const addCategory = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('admin/categories/add-category', {
            role: req.role,
            errors: errors.array(),
        })
    }

    try {
        await categoryModel.create(req.body);
        return res.redirect('/admin/category');
    } catch (error) {
        next(error);
    }
}


const updateCategoryPage = async (req, res, next) => {
    try {
        const category = await categoryModel.findById(req.params.id)
        res.render('admin/categories/update-category', { category, role: req.role, errors: 0 })
    } catch (error) {
        next(error);
    }
}


const updateCategory = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const category = await categoryModel.findById(req.params.id)
        return res.render('admin/categories/update-category', {
            category,
            role: req.role,
            errors: errors.array(),
        })
    }


    const { name, description } = req.body
    try {
        const category = await categoryModel.findById(req.params.id)
        if (!category) {
            return next
        }
        category.name = name ||  category.name
        category.description = description || category.description
        await category.save()
        return res.redirect('/admin/category' )
    }
    catch (error) {
        next(error);
    }
}


const deleteCategory = async (req, res, next) => {
    const id = req.params.id
    try {
        const category = await categoryModel.findByIdAndDelete(id)
        if (!category) {
            return next(createError('Category not found', 404))
        }
        res.json({success: true })
    }
    catch (error) {
        next(error);
    }
}



module.exports = {
    allCategory, addCategoryPage, addCategory, updateCategoryPage, updateCategory, deleteCategory
}
