const userModel = require('../models/User.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

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
    res.render('admin/users/user', { users, role: req.role })
}

const addUserPage = async (req, res) => {
    res.render('admin/users/add-user', { role: req.role })
}

const addUser = async (req, res) => {
    await userModel.create(req.body)
    res.redirect('/admin/users', { role: req.role })
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
        res.redirect('/admin/users', { role: req.role } )
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
        res.json({success: true })
    }
    catch (error) {
        return res.status(500).send(error.message)
    }
}

const dashboardPage = async (req, res) => {
    res.render('admin/dashboard', {role: req.role})
}

const settingsPage = async (req, res) => {
    res.render('admin/settings', { role: req.role })
}



module.exports = {
    loginPage, adminLogin, logout, allUser, addUserPage, addUser, updateUserPage, updateUser, deleteUser, dashboardPage, settingsPage
}