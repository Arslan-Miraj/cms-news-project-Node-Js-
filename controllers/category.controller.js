const categoryModel = require('../models/Category.model')


const allCategory = async (req, res) => {
    const categories =  await categoryModel.find();
    res.render('admin/categories/category', { categories, role: req.role })
}

const addCategoryPage = async (req, res) => {
    res.render('admin/categories/add-category', { role: req.role })
}


const addCategory = async (req, res) => {
    try {
        await categoryModel.create(req.body);
        return res.redirect('/admin/category');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


const updateCategoryPage = async (req, res) => {
    try {
        const category = await categoryModel.findById(req.params.id)
        res.render('admin/categories/update-category', { category, role: req.role })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


const updateCategory = async (req, res) => {
    const { name, description } = req.body
    try {
        const category = await categoryModel.findById(req.params.id)
        if (!category) {
            return res.status(404).send('Category not found')
        }
        category.name = name ||  category.name
        category.description = description || category.description
        await category.save()
        return res.redirect('/admin/category' )
    }
    catch (error) {
        return res.status(500).send(error.message)
    }
}


const deleteCategory = async (req, res) => {
    const id = req.params.id
    try {
        const category = await categoryModel.findByIdAndDelete(id)
        if (!category) {
            return res.status(404).send('Category not found')
        }
        res.json({success: true })
    }
    catch (error) {
        return res.status(500).send(error.message)
    }
}



module.exports = {
    allCategory, addCategoryPage, addCategory, updateCategoryPage, updateCategory, deleteCategory
}
