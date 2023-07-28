// models/User.js
const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid'); // To generate UUIDs
const { sequelize } = require('../database/db');

module.exports = (sequelize) =>{
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
  
  

  
  // Before creating a new user, generate a UUID and assign it to the 'id' field
  Role.beforeCreate((role) => {
    role.id = uuidv4();
  });
  
  
  return Role;
}

