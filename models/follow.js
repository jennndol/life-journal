'use strict';
const Model = require('../models')

module.exports = (sequelize, DataTypes) => {
    var Follow = sequelize.define('Follow', {
        UserId: DataTypes.INTEGER,
        FollowerId: {
            type: DataTypes.INTEGER,
            validate: {
                /*isUnique(value, next) {
                    Model.Follow.findOne({ where: { FollowerId: values } }).then(follower => {
                        if (follower) {
                            next('You have follow or block this person');
                        }
                        next();
                    })
                },*/
                isRedundant(value, next) {
                    if (value == this.UserId) {
                        next("Same account can't be followed and blocked")
                    } else {
                        next()
                    }
                }
            }
        },
        status: DataTypes.STRING
    });
    return Follow;
};