'use strict';
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        username: DataTypes.STRING,
        password: DataTypes.STRING
    });

    User.associate = (models) => {
        User.hasMany(models.Journal, onDelete='CASCADE');
        User.belongsToMany(User, {as: 'UserId', through: 'Follow', foreignKey: 'FollowerId', onDelete='CASCADE'});        
        User.belongsToMany(User, {as: 'FollowerId', through: 'Follow', foreignKey: 'UserId', onDelete='CASCADE'});
    }
    return User;
};