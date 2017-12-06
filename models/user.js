'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        username: {
          type : DataTypes.STRING,
          validate: {
            isUnique(value, next){
              User.findOne({
                where : {
                  username : value,
                  id: {[sequelize.Op.ne]: this.id }
                }
              })
              .then(user => {
                if(user){
                  next('Username is taken')
                }
                next();
              })
              .catch(error => {
                console.log(error);
              });
            }
          }
        },
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
      return bcrypt.hash(user.password, 10).then( (hash) => {
          user.password = hash
      }).catch(error => res.send(error));
    });    

    User.beforeCreate((user, options) => {
      console.log('Masuk Hook');
      user.username = user.username.toLowerCase();
    });

    User.prototype.login = function(password, callback) {
      bcrypt.compare(password, this.password).then( (res) => {
        callback(res);
      });
    };

    return User
};