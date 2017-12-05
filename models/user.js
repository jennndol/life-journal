'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        username: DataTypes.STRING,
        password: DataTypes.STRING
    });

    User.associate = (models) => {
        User.hasMany(models.Journal);
        User.belongsToMany(User, {
            as: 'UserId',
            through: 'Follow',
            foreignKey: 'FollowerId'
        });
        User.belongsToMany(User, {
            as: 'FollowerId',
            through: 'Follow',
            foreignKey: 'UserId'
        });
    }

    User.beforeCreate((user, options) => {
      return bcrypt.hash(user.password, 10).then(function(hash) {
          user.password = hash
      }).catch(error => res.send(error));
    });
    return User
};