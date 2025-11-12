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


dotenv.config();


// Login Functions
const loginPage = async (req, res) => {
    res.render('admin/login', {
        layout: false
    })
}

const adminLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.findOne({ username: username });
        if (!user) {
            return res.status(401).send('Invalid username or password');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Invalid username or password');
        }

        const jwt_data = { id: user._id, full_name: user.full_name, role: user.role };
        const token = jwt.sign(jwt_data, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
        res.redirect('/admin/dashboard');
    } catch (error) {
        return res.status(500).send(error.message);
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

const updateUserPage = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id)
        if (!user) {
            return res.status(404).send('User not found')
        }
        res.render('admin/users/update-user', { user, role: req.role })
    } catch (error) {
        return res.status(500).send(error.message)
    }
    
}


const updateUser = async (req, res) => {
    const { full_name, password, role } = req.body
    try {
        const user =await userModel.findById(req.params.id)
        if (!user) {
            return res.status(404).send('User not found')
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
        return res.status(500).send(error.message)
    }

}

const deleteUser = async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send('User not found')
        }
        return res.json({success: true })
    }
    catch (error) {
        return res.status(500).send(error.message)
    }
}

const dashboardPage = async (req, res) => {
    try {
        let articles_count;
        req.role === 'author' ? articles_count = await articleModel.countDocuments({ author: req.id}) : articles_count = await articleModel.countDocuments();
        const users_count = await userModel.countDocuments()
        // const articles_count = await articleModel.countDocuments()
        const categories_count = await categoryModel.countDocuments()
        // console.log(users, articles, categories)
        res.render('admin/dashboard', { users_count, articles_count, categories_count, full_name: req.full_name, role: req.role })
    } catch (error) {
        console.log(error)
        res.status(500).send('Dashboard Not Found');
    }
    
}

const settingsPage = async (req, res) => {
    try {
        const settings = await settingsModel.findOne();
        res.render('admin/settings', { role: req.role, settings })
    } catch (error) {
        console.log(error)
        res.status(500).send('Settings Not Found');
    }
}

const saveSettings = async (req, res) => {
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
            console.log(settings);
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
        console.error(error);
        res.status(500).send('Error saving settings');
    }
    
}



module.exports = {
    loginPage, adminLogin, logout, allUser, addUserPage, addUser, updateUserPage, updateUser, deleteUser, dashboardPage, settingsPage, saveSettings
}