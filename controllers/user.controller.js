const userModel = require('../models/User.model')


// Login Functions
const loginPage = async (req, res) => {
    res.render('admin/login', {
        layout: false
    })
}

const adminLogin = async (req, res) => {

}

const logout = async (req, res) => {

}



// User Functions
const allUser = async (req, res) => {
    res.render('admin/users/user')
}

const addUserPage = async (req, res) => {

}

const addUser = async (req, res) => {

}

const updateUserPage = async (req, res) => {

}


const updateUser = async (req, res) => {

}

const deleteUser = async (req, res) => {

}

const dashboardPage = async (req, res) => {
    res.render('admin/dashboard')
}

const settingsPage = async (req, res) => {
    res.render('admin/settings')
}



module.exports = {
    loginPage, adminLogin, logout, allUser, addUserPage, addUser, updateUserPage, updateUser, deleteUser, dashboardPage, settingsPage
}