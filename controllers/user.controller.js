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
    const users = await userModel.find()
    res.render('admin/users/user', { users })
}

const addUserPage = async (req, res) => {
    res.render('admin/users/add-user')
}

const addUser = async (req, res) => {
    await userModel.create(req.body)
    res.redirect('/admin/users')
}

const updateUserPage = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id)
        if (!user) {
            return res.status(404).send('User not found')
        }
        res.render('admin/users/update-user', { user })
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
        res.redirect('/admin/users')
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
        res.json({success: true})
    }
    catch (error) {
        return res.status(500).send(error.message)
    }
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