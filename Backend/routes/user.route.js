const express = require('express')
const userController = require('../controllers/user.controller')
const {validateCreateField} = require('../middlewares/validateFields')
const {validateAuthorityUserC,validateAuthorityUserDE, authenticateUser} = require('../middlewares/auth')

const router = express.Router();

router.post('/register',userController.register)
// router.post('/list',userController.list)
router.post('/create',[authenticateUser, validateCreateField, validateAuthorityUserC], userController.create)
router.post('/delete',[authenticateUser,validateAuthorityUserDE],userController.delete)
// router.post('/changerole',userController.changeRole)



module.exports = router