const {User} = require('../database/db')


exports.register = async(req, res) => {
    try {
        const { username, email,firstname, lastname, password } = req.body
        const users = await User.findAll({
            limit: 1,
        });
        if(users.length == 0){
            let user = await User.create({ username,email, firstname, lastname, role:"ROOT",password })
            if(user){
                console.log(user)
                res.status(200).json({"Message":"Root user created"})
            }else{
                res.status(401).json({"Message":"An error occured"})
            }
        }else{
            res.status(401).json({"Message":"Root user already exists"})
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({"Message":"An error occured"})
    }
    
}

  