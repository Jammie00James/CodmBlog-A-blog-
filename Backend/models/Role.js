// models/User.js
const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid'); // To generate UUIDs
const sequelize = require('../database/db');

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  privileges: {
    type: DataTypes.JSON,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  // Add more properties as needed
});


Role.hasMany(User, {
  foreignKey: 'role',
});

// Before creating a new user, generate a UUID and assign it to the 'id' field
User.beforeCreate((role) => {
  role.id = uuidv4();
});


module.exports = Role;