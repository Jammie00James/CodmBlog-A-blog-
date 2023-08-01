const { checkToken } = require('../services/auth.service')
const {User, Post} = require('../database/db')

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
    const newRole = req.body.role
    const user = await User.findOne({
        attributes: ['id', 'role'],
        where: {
            username: username
        }
    });

    if (user) {
        const { id, role } = req.user
        if(!newRole){
            if (role === "ROOT" && (user.role === "ADMIN" || user.role === "EDITOR")) {
                next()
            } else if (role === "ADMIN" && user.role === "EDITOR") {
                next()
            } else {
                res.status(401).json({ "Message": "UnAuthorized" })
            }
        }else{
            if (role === "ROOT" && (user.role === "ADMIN" || user.role === "EDITOR") && (newRole === "ADMIN" || newRole === "EDITOR") ) {
                next()
            } else if (role === "ADMIN" && user.role === "EDITOR" && newRole === "EDITOR") {
                next()
            } else {
                res.status(401).json({ "Message": "UnAuthorized" })
            }
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

const validateAuthorityPostE = async (req, res, next) => {
    const { postId, status } = req.body

    const post = await Post.findOne({
        attributes: ['id', 'status','author'],
        where: {
            id:postId
        }
    });

    if (post) {
        const {id} = req.user
        if(post.author === id){
            if(post.status !== status){
                next()
            }else{
                res.status(401).json({ "Message": "Already changed" })
            }
        }else{
            res.status(401).json({ "Message": "UnAuthorized" })
        }
    } else {
        res.status(401).json({ "Message": "Post Doesn't exist" })
    }
}


const validateAuthorityPostD = async (req, res, next) => {
try {
        const { postId} = req.body
    
        const post = await Post.findOne({
            attributes: ['id','author'],
            where: {
                id:postId
            }
        });
        if (post) {
            const {id, role} = req.user
            if(post.author === id){
                next()
            }else{
                const user = await User.findOne({
                    attributes: ['id','role'],
                    where: {
                        id:post.author
                    }
                });
                if (role === "ROOT" && (user.role === "ADMIN" || user.role === "EDITOR")) {
                    next()
                } else if (role === "ADMIN" && user.role === "EDITOR") {
                    next()
                } else {
                    res.status(401).json({ "Message": "UnAuthorized" })
                }
            }
        } else {
            res.status(401).json({ "Message": "Post Doesn't exist" })
        }
} catch (error) {
    console.log(error)
    res.status(401).json({ "Message": "An error occured" })
}
}

module.exports = { validateAuthorityUserC, validateAuthorityUserDE, authenticateUser, validateAuthorityPostE, validateAuthorityPostD }