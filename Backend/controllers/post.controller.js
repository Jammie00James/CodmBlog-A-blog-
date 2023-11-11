const {User,Post} = require('../database/db')



exports.create = async(req, res) => {
    try {
        const { title, body, status } = req.body
        if(!title || !body ) return  res.status(400).json({"Error":"fields must not be empty"})
        const {id} = req.user
        let post
        if(status === 'D'){
            post = await Post.create({ title, body, status, author:id })
        }else{
            let currentDate = new Date()
            currentDate = currentDate.toISOString().slice(0,19).replace('T',' ')
            post = await Post.create({ title, body, status, author:id, publishedAt:currentDate })
        }
        if(post){
            res.status(200).json({"Message":"Post Created"})
        }else{
            res.status(401).json({"Message":"An Error Ocoured"})
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({"Message":"An Error Ocoured"})
    }
}


exports.changeStatus = async(req, res) => {
    try {
        const { postId, status } = req.body
        if(!postId && !status ) return  res.status(400).json({"Error":"fields must not be empty"})
        if(status === 'D'){
            await Post.update({status:status,publishedAt:null},{
                where: {
                    id: postId
                }
            });
        }else{
            let currentDate = new Date()
            currentDate = currentDate.toISOString().slice(0,19).replace('T',' ')
            await Post.update({status:status,publishedAt:currentDate},{
                where: {
                    id:postId
                }
            });
        }
        res.status(200).json({"Message":"Post Updated"})
    } catch (error) {
        console.log(error)
        res.status(401).json({"Message":"An Error Ocoured"})
    }
}


exports.delete = async(req, res) => {
    try {
        const { postId } = req.body
        if(!postId) return  res.status(400).json({"Error":"fields must not be empty"})
        await Post.destroy({
            where: {
                id:postId
            }
        });
        res.status(200).json({ "Message": "Post Deleted" })
    } catch (error) {
        console.log(error)
        res.status(401).json({ "Message": "An error occured" })
    }
}