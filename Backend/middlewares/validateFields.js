
const validateUserCreateField = (req, res, next) => {
  const { username, email, firstname, lastname, role, password } = req.body

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const first = emailRegex.test(email);

  const usernameRegex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
  const second = usernameRegex.test(username);

  const nameRegex = /^[a-zA-Z]{1,30}$/;
  const third = nameRegex.test(firstname);
  const fourth = nameRegex.test(lastname);


  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  const fifth = passwordRegex.test(password);

  let sixed = false;
  if (role === "ADMIN" || role === "EDITOR") {
    sixed = true;
  }

  if (first && second && third && fourth && fifth && sixed) {
    next();
  } else {
    res.status(401).json({ "Message": "Invalid inputs" })
  }
}

const validatePostCreateField = (req, res, next) => {
  const { title, body, status } = req.body
  let first = false;
  let second = false
  let third = false
  if (title) {
    first = true;
  }
  if (body) {
    second = true;
  }
  if (status === 'D' || status === 'P') {
    third = true;
  }
  if (first && second && third) {
    next();
  } else {
    res.status(401).json({ "Message": "Invalid inputs" })
  }
}


const validatePostChangeStatusField = (req, res, next) => {
  const { postId, status } = req.body
  let first = false;
  let second = false
  if (postId) {
    first = true;
  }
  if (status === 'D' || status === 'P') {
    second = true;
  }
  if (first && second) {
    next();
  } else {
    res.status(401).json({ "Message": "Invalid inputs" })
  }
}


const validateCommentFields = async (req, res, next) => {
  try {
    const { Post } = require('../database/db')

    const { postId } = req.params.id
    const { username, body } = req.body
    const Regex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
    const first = Regex.test(username);
    const second = Regex.test(body);

    let third = await Post.findOne({
      attributes: ['id'],
      where: {
        id: postId
      }
    });

    if (first && second && third) {
      next()
    } else {
      res.status(400).json({ "Message": "Invalid Inputss" })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ "Message": "An error Occured" })
  }
}
module.exports = { validateUserCreateField, validateCommentFields, validatePostCreateField, validatePostChangeStatusField }