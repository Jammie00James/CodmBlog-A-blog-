// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
    
  },
  status: {
    type: DataTypes.CHAR(1),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Set the default value to the current date and time
    allowNull: false,
  },
  publishedAt: {
    type: DataTypes.DATE,// Set the default value to the current date and time
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Set the default value to the current date and time
    allowNull: false,
  },
  // Add more properties as needed
});


Post.belongsTo(User, { 
    foreignKey: 'author' ,
    allowNull: false,
});

Post.hasMany(Comment, {
  foreignKey: 'post',
  allowNull: false, // Ensure that 'userId' cannot be null
});


module.exports = Post;