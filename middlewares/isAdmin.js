const isAdmin =  (req, res, next) => {
    if (req.role == 'admin') {
        return next()  
    }
    return res.redirect('/admin/dashboard')
   
}

module.exports = isAdmin;