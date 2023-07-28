
function relate(Role,User,Post,Comment,Reply) {
    Role.hasMany(User, {
        foreignKey: 'role',
      });
      User.belongsTo(Role, { foreignKey: 'role' });
        
      User.hasMany(Post, {
        foreignKey: 'author',
        allowNull: false, // Ensure that 'userId' cannot be null
      });
      User.hasMany(Reply, {
        foreignKey: 'user',
      });
      Post.belongsTo(User, { 
        foreignKey: 'author' ,
        allowNull: false,
      });
      
      Post.hasMany(Comment, {
      foreignKey: 'post',
      allowNull: false, // Ensure that 'userId' cannot be null
      });
      Comment.belongsTo(Post, { 
        foreignKey: 'post' ,
        allowNull: false,
      });
      
      Comment.hasMany(Reply, {
      foreignKey: 'comment',
      allowNull: false, 
      });
      Reply.belongsTo(Comment, { 
        foreignKey: 'comment' ,
        allowNull: false,
      });
      
      Reply.belongsTo(User, { 
        foreignKey: 'user' ,
      });
      
}

module.exports = relate