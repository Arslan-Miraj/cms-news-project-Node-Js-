const isAdmin =  (req, res, next) => {
    if (req.role == 'admin') {
        next()  
    }
    return res.redirect('/admin/dashboard')
   
}

module.exports = isAdmin;