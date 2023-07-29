const express = require('express')
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
dotenv.config()
const { sequelize, syncDatabase } = require('./database/db');


const app = express()

app.use(bodyParser.json());
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/user', require('./routes/user.route'));
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
    
  }
}

app.listen(5000, ()=>{
      console.log('App is running on port 5000')
      startApp();
  })
  