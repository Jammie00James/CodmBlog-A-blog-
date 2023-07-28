// db.js
const { Sequelize } = require('sequelize');
const config = require('../config.env')
const RoleModel = require('../models/Role')
const UserModel = require('../models/User')
const PostModel = require('../models/Post')
const CommentModel = require('../models/Comment')
const ReplyModel = require('../models/Reply')
const relateModel = require('../models/createRelationships.js')


console.log(config.DATABASE_USER)
const sequelize = new Sequelize(config.DATABASE, config.DATABASE_USER, config.DATABASE_PASSWORD, {
  host: config.DATABASE_HOST,
  dialect: 'mysql', });

const Role = RoleModel(sequelize);
const User = UserModel(sequelize);
const Post = PostModel(sequelize);
const Comment = CommentModel(sequelize);
const Reply = ReplyModel(sequelize);

relateModel(Role,User,Post,Comment,Reply)

async function syncDatabase() {
  try {
    await sequelize.sync({ force: false}); // Use { force: true } to drop and recreate the tables on each sync (for development)
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
