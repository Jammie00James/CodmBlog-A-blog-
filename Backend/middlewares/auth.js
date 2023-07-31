const { checkToken } = require('../services/auth.service')
const {User} = require('../database/db')

const validateAuthorityUserC = (req, res, next) => {
    const userRole = req.body.role

    const { id, role } = req.user
    if (role === "ROOT") {
        next()
    } else if (role === "ADMIN" && userRole === "EDITOR") {
        next()
    } else {
        res.status(401).json({ "Message": "UnAuthorized" })
    }

}

const validateAuthorityUserDE = async (req, res, next) => {
    const { username } = req.body
    const user = await User.findOne({
        attributes: ['id', 'role'],
        where: {
            username: username
        }
    });
    if (user) {
        const { id, role } = req.user
        if (role === "ROOT" && user.role !== "ROOT") {
            next()
        } else if (role === "ADMIN" && user.role === "EDITOR") {
            next()
        } else {
            res.status(401).json({ "Message": "UnAuthorized" })
        }
    } else {
        res.status(401).json({ "Message": "User Doesn't exist" })
    }
}

const authenticateUser = async (req, res, next) => {
    const token = req.cookies.Jwt;
    if (token) {
        // Verify the token
        console.log('jah')
        let id = await checkToken(token)
        if (id) {
            const user = await User.findOne({
                attributes: ['id', 'role'],
                where: {
                    id: id
                }
            });
            if (user) {
                req.user = user;
                next();
            } else {
                return res.status(401).json({ error: 'Invalid Token' });
            }
        } else {
            return res.status(401).json({ error: 'Invalid Token' });
        }

    } else {
        return res.status(401).json({ error: 'No token provided' });
    }
}

module.exports = { validateAuthorityUserC, validateAuthorityUserDE, authenticateUser }