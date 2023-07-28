const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const { sequelize, syncDatabase } = require('./database/db');



console.log(process.env.DATABASE)
const app = express()

//app.use('/auth', require('./routes/auth.route'));
//app.use('/home', require('./routes/home.route'));
//app.use('/posts', require('./routes/posts.route'));

app.all('*', (req,res) => {
    res.status(404).send('Page not Found')
  })
  

  

async function startApp() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established.');
    await syncDatabase();
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

app.listen(5000, ()=>{
      console.log('App is running on port 5000')
      startApp();
  })
  