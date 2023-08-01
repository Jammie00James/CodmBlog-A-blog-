const express = require('express')
const postController = require('../controllers/post.controller')
const {validatePostCreateField,validatePostChangeStatusField} = require('../middlewares/validateFields')
const {authenticateUser,validateAuthorityPostE,validateAuthorityPostD } = require('../middlewares/auth')

const router = express.Router();

//router.post('/list', [authenticateUser], userController.list)
router.post('/create',[authenticateUser,validatePostCreateField], postController.create)
router.post('/changeStatus',[authenticateUser,validatePostChangeStatusField,validateAuthorityPostE], postController.changeStatus)
// router.post('/unpublish',[authenticateUser, validateCreateField, validateAuthorityUserC], userController.create)
router.post('/delete',[authenticateUser, validateAuthorityPostD],postController.delete)



module.exports = router