// db.js
const { Sequelize } = require('sequelize');
const config = require('../config.env')
const Role = require('../models/Role')
const User = require('../models/User')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const Reply = require('../models/Reply')



const sequelize = new Sequelize(config.DATABASE, config.DATABASE_USER, config.DATABASE_PASSWORD, {
  host: config.DATABASE_HOST,
  dialect: config.DATABASE_DIALECT, });

async function syncDatabase() {
  try {
    await sequelize.sync({ force: true }); // Use { force: true } to drop and recreate the tables on each sync (for development)
    console.log('Database sync complete.');
  } catch (error) {
    console.error('Error syncing the database:', error);
  }
}


module.exports = {
  sequelize,
  User,
  Role,
  Post,
  Comment,
  Reply,
  syncDatabase,
};
