// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Reply = sequelize.define('Reply', {
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

Reply.belongsTo(Comment, { 
    foreignKey: 'comment' ,
    allowNull: false,
});

Reply.belongsTo(User, { 
    foreignKey: 'user' ,
});

module.exports = Reply;