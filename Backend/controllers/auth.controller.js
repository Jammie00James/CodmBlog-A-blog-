const {User} = require('../database/db')
const {checkPassword, makeToken} = require('../services/auth.service')


exports.login = async(req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({
        attributes: ['id', 'password'],
        where: {
          username: username
        }
      });
    if(user){
        let verify = await checkPassword(user.password,password)
        if(verify){
            let token = await makeToken(user.id)
            res.status(200).cookie('Jwt', token, { httpOnly: true, secure: true }).json({"Message":"Success",Jwt:token})
        }else{
            res.status(401).json({"Message":"Username or Password Incorrect"})
        }
    }else{
        res.status(401).json({"Message":"Username or Password Incorrect"})
    }
}


exports.logout = (req, res) => {
    res.clearCookie('Jwt');
    res.status(200).json({ success: true, message: 'Logout successful' });
  };
  