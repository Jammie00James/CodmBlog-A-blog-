const express = require('express')
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');
dotenv.config()
const { sequelize, syncDatabase } = require('./database/db');


const app = express()
app.use((req, res, next) => {
  // Set Access-Control-Allow-Origin to allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Add other CORS headers as needed
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/user', require('./routes/user.route'));
app.use('/api/post', require('./routes/posts.route'));
app.use('/api/public', require('./routes/public.route'));

app.all('*', (req, res) => {
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

app.listen(5000, async () => {
  await startApp();
  console.log('App is running on port 5000')

})
