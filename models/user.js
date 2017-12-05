'use strict';
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        username: DataTypes.STRING,
        password: DataTypes.STRING
    });

    User.associate = (models) => {
        User.hasMany(models.Journal);
        User.belongsToMany(User, {as: 'UserId', through: 'Follow', foreignKey: 'FollowerId'});        
        User.belongsToMany(User, {as: 'FollowerId', through: 'Follow', foreignKey: 'UserId'});
    }
    return User;
};