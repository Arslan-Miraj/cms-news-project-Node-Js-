const jwt = require('jsonwebtoken')

const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.redirect('/admin/')
        }
        const token_data = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(token_data)
        req.role = token_data.role
        req.full_name = token_data.full_name
        next()
    } catch (error) {
        return res.status(401).send('Unauthorized')
    }
}

module.exports = isLoggedIn;