
const validateCreateField = (req, res, next) => {
  const { username, email,firstname, lastname,role, password } = req.body

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
  if(role === "ADMIN" || role === "EDITOR"){
    sixed = true;
  }

if(first && second && third && fourth && fifth && sixed){
  next();
}else{
  res.status(401).json({"Message":"Invalid inputs"})
}
}


module.exports = {validateCreateField}