const express = require('express')
const userController = require('../controllers/user.controller')

const router = express.Router();

router.post('/register',userController.register)
// router.post('/list',userController.list)
// router.post('/create',userController.create)
// router.post('/delete',userController.delete)
// router.post('/changerole',userController.changeRole)



module.exports = router