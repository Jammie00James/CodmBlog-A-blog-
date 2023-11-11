const express = require('express')
const publicController = require('../controllers/public.controller')
const {validateCommentFields} = require('../middlewares/validateFields')
const router = express.Router();

router.get('/listposts', publicController.listPost)
router.get('/:id/listcomments', publicController.listComment)
router.get('/:id', publicController.showPost)
router.get('/:pid/:id/listReplies', publicController.listReplies)
router.post('/:id/postcomment',validateCommentFields, publicController.postComment)



module.exports = router