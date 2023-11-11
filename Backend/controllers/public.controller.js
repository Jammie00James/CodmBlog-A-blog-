const { User, Post, Comment, Reply } = require('../database/db')


exports.listPost = async (req, res) => {
  try {
    let posts = await Post.findAll({
      attributes: ['id', 'title', 'body', 'author', 'publishedAt'],
      where: {
        status: 'P'
      }
    });
    posts.forEach(async post => {
      let user = await User.findOne({
        attributes: ['firstname', 'lastname'],
        where: {
          id: post.author
        }
      });
      post.author = user;
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error)
    res.status(401).json({ "Message": "An Error Ocoured" })
  }
}

exports.showPost = async (req, res) => {
  try {
    const postId = req.params.id
    let post = await Post.findOne({
      attributes: ['id', 'title', 'body', 'author', 'publishedAt'],
      where: {
        [Op.and]: [
          { id: postId },
          { status: 'P' }
        ]
      }
    });
    let user = await User.findOne({
      attributes: ['firstname', 'lastname'],
      where: {
        id: post.author
      }
    });
    post.author = user;

    res.status(200).json(post);
  } catch (error) {
    console.log(error)
    res.status(401).json({ "Message": "An Error Ocoured" })
  }
}



exports.listComment = async (req, res) => {
  try {
    const { postId } = req.params.id
    let comments = await Comment.findAll({
      attributes: ['id', 'username', 'body', 'postedAt'],
      where: {
        post: postId
      }
    });
    res.status(200).json(comments);
  } catch (error) {
    console.log(error)
    res.status(401).json({ "Message": "An Error Ocoured" })
  }
}

exports.listReplies = async (req, res) => {
  try {
    const { commentId } = req.params.id
    let replies = await Reply.findAll({
      attributes: ['id', 'username', 'body', 'postedAt'],
      where: {
        comment: commentId
      }
    });
    res.status(200).json(replies);
  } catch (error) {
    console.log(error)
    res.status(401).json({ "Message": "An Error Ocoured" })
  }
}


exports.postComment = async (req, res) => {
  try {
    const { postId } = req.params.id
    const { username, body } = req.body

    const comment = await Comment.create({ username, body, post: postId });
    res.status(200).json(comment);
  } catch (error) {
    console.log(error)
    res.status(401).json({ "Message": "An Error Ocoured" })
  }
}