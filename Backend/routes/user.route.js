const express = require('express')
const userController = require('../controllers/user.controller')
const {validateUserCreateField} = require('../middlewares/validateFields')
const {validateAuthorityUserC,validateAuthorityUserDE, authenticateUser} = require('../middlewares/auth')

const router = express.Router();

router.post('/register',userController.register)
router.post('/list', [authenticateUser], userController.list)
router.post('/create',[authenticateUser, validateUserCreateField, validateAuthorityUserC], userController.create)
router.post('/delete',[authenticateUser,validateAuthorityUserDE],userController.delete)
router.post('/changerole',[authenticateUser,validateAuthorityUserDE],userController.changeRole)



module.exports = router