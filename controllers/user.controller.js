const userModel = require('../models/User.model')
const articleModel = require('../models/News.model')
const categoryModel = require('../models/Category.model')
const settingsModel = require('../models/Settings.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { request } = require('express')
const fs = require('fs');
const path = require('path');
const createError = require('../utils/error-message');


dotenv.config();


// Login Functions
const loginPage = async (req, res) => {
    res.render('admin/login', {
        layout: false
    })
}

const adminLogin = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.findOne({ username: username });
        if (!user) {
            return 
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return next(createError('Invalid username or password', 401));
        }

        const jwt_data = { id: user._id, full_name: user.full_name, role: user.role };
        const token = jwt.sign(jwt_data, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
        res.redirect('/admin/dashboard');
    } catch (error) {
        next(error);
    }
}

const logout = async (req, res) => {
    res.clearCookie('token')
    res.redirect('/admin/')
}



// User Functions
const allUser = async (req, res) => {
    const users = await userModel.find()
    return res.render('admin/users/user', { users, role: req.role })
}

const addUserPage = async (req, res) => {
    res.render('admin/users/add-user', { role: req.role })
}

const addUser = async (req, res) => {
    await userModel.create(req.body)
    return res.redirect('/admin/users')
}

const updateUserPage = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.params.id)
        if (!user) {
            return next(createError('User not found', 404))
        }
        res.render('admin/users/update-user', { user, role: req.role })
    } catch (error) {
        next(error);
    }
    
}


const updateUser = async (req, res, next) => {
    const { full_name, password, role } = req.body
    try {
        const user =await userModel.findById(req.params.id)
        if (!user) {
            return next(createError('User not found', 404))
        }

        user.full_name = full_name || user.full_name
        if (password){
            user.password = password
        }

        user.role = role || user.role
        await user.save()
        return res.redirect('/admin/users' )
    }
    catch (error) {
        next(error);
    }

}

const deleteUser = async (req, res, next) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id)
        if (!user) {
            return next(createError('User not found', 404))
        }
        return res.json({success: true })
    }
    catch (error) {
        next(error);
    }
}

const dashboardPage = async (req, res, next) => {
    try {
        let articles_count;
        req.role === 'author' ? articles_count = await articleModel.countDocuments({ author: req.id}) : articles_count = await articleModel.countDocuments();
        const users_count = await userModel.countDocuments()
        // const articles_count = await articleModel.countDocuments()
        const categories_count = await categoryModel.countDocuments()
        // console.log(users, articles, categories)
        res.render('admin/dashboard', { users_count, articles_count, categories_count, full_name: req.full_name, role: req.role })
    } catch (error) {
        next(error);
    }
    
}

const settingsPage = async (req, res, next) => {
    try {
        const settings = await settingsModel.findOne();
        res.render('admin/settings', { role: req.role, settings })
    } catch (error) {
        next(error);
    }
}

const saveSettings = async (req, res, next) => {
    const { web_title, footer_description} = req.body;
    const website_logo = req.file ? req.file.filename : null;

    try {
        const settings = await settingsModel.findOne();

        if (settings) {

            const oldLogo = settings.website_logo;

            // Update existing settings document
            settings.website_title = web_title;
            settings.footer_description = footer_description;


            if (website_logo) {
                settings.website_logo = website_logo;

                if (oldLogo) {
                    // Delete old image file
                    const oldImagePath = path.join(__dirname, '..', 'public', 'uploads', oldLogo);
                    fs.unlinkSync(oldImagePath);
                }
            }
            // console.log(settings);
            await settings.save();
        } else {
            // Create new settings document
            await settingsModel.create({
                website_title: web_title,
                website_logo: website_logo,
                footer_description: footer_description,
            });
            // console.log('Creating new settings');
        }
        res.redirect('/admin/settings');
    } catch (error) {
        next(error);
    }
    
}



module.exports = {
    loginPage, adminLogin, logout, allUser, addUserPage, addUser, updateUserPage, updateUser, deleteUser, dashboardPage, settingsPage, saveSettings
}