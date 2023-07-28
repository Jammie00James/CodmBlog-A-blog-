// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  postedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
});

Comment.belongsTo(Post, { 
    foreignKey: 'post' ,
    allowNull: false,
});

Comment.hasMany(Reply, {
  foreignKey: 'comment',
  allowNull: false, 
});


module.exports = Comment;