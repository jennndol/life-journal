const express = require('express');
const router = express.Router();
const Model = require('../models');
const auth = require('../helpers/auth');
const islogin = require('../helpers/islogin');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', (req, res) => {
    Model.User.findAll().then((users) => {
        res.render('users/index', {
            title: 'Users List',
            users: users,
            section: 'users',
        })
    }).catch((error) => {
        res.render('error/400', {
            title: 'ERROR BAD REQUEST',
            username: req.session.username,
            section: '',
            error: error
        });
    })
});

router.get('/followers', auth, (req, res) => {
    Model.Follow.findAll({
            where: {
                UserId: req.session.UserId
            }
        })
        .then(followers => {
            let arr = [];
            followers.forEach(follower => {
                arr.push(follower.FollowerId);
            });
            if (arr.length > 0) {
                Model.User.findAll({
                    where: {
                        id: {
                            [Op.any]: [arr]
                        }
                    }
                })
                .then(followersDetail => {
                    res.render('users/followers', {
                        title: 'Followers',
                        section: 'followers',
                        username: req.session.username,
                        followers: followersDetail,
                        status: followers,
                    });
                })
                .catch(error => {
                    res.render('error/400', {
                        title: 'ERROR BAD REQUEST',
                        username: req.session.username,
                        section: '',
                        error: error
                    });
                })
            }
            else{
                res.render('users/followers', {
                        title: 'Followers',
                        section: 'followers',
                        username: req.session.username,
                        followers: [],
                        status: followers,
                    });
            }          
        })
        .catch(error => {
            res.render('error/400', {
                title: 'ERROR BAD REQUEST',
                username: req.session.username,
                section: '',
                error: error
            });
        });
});

router.get('/settings', auth, (req, res) => {
    Model.User.find({ where: { id: req.session.UserId } }, { attributes: ['username'] }).then(user => {
        res.render('users/setting', {
            title: 'Change Setting',
            username: req.session.username,
            section: 'users',
            user: user,
            error: null,
        })
    })
})

router.get('/:username', auth, (req, res) => {
    Model.User.findOne({ include: [Model.Journal], where: { username: req.params.username, } }).then(user => {
        Model.Follow.findAll({ where: { UserId: user.id }, attributes: ['FollowerId'] }).then((listFollower) => {
            Model.Follow.findOne({ where: { UserId: req.session.UserId, FollowerId: user.id }, attributes: ['status'] }).then((status) => {
                let follow = listFollower.map((key) => {
                    return key.FollowerId
                })
                if (status == null) status = '';
                res.render('users/profile', {
                    title: user.username,
                    username: req.session.username,
                    UserId: req.session.UserId,
                    journals: user.Journals,
                    section: 'journals',
                    listfollower: follow,
                    status: status, 
                })
            })
        })
    }).catch(error => {
        res.render('error/400', {
            title: 'ERROR BAD REQUEST',
            username: req.session.username,
            section: '',
            error: error
        });
    });
});

router.post('/settings', auth, (req, res) => {
    Model.User.find({ where: { id: req.session.UserId } }).then(user => {
        if (req.body.newpassword == req.body.verifpassword) {
            user.login(req.body.oldpassword, (result) => {
                if (result) {
                    Model.User.update({ password: req.body.newpassword }, { where: { id: req.session.UserId } }).then(() => {
                        res.send('Sukses')
                    }).catch(error => {
                        res.render('users/setting', {
                            title: 'Change Setting',
                            username: req.session.username,
                            section: 'users',
                            user: user,
                            error: error,
                        })
                    })
                } else {
                    res.render('users/setting', {
                        title: 'Change Setting',
                        username: req.session.username,
                        section: 'users',
                        user: user,
                        error: "Wrong old password",
                    })
                }
            })
        } else {
            res.render('users/setting', {
                title: 'Change Setting',
                username: req.session.username,
                section: 'users',
                user: user,
                error: "Please make sure you verif new password",
            })
        }
    }).catch(error => {
        res.render('error/400', {
            title: 'ERROR BAD REQUEST',
            username: req.session.username,
            section: '',
            error: error
        });
    })
})

router.get('/:username', auth, (req, res) => {
    Model.User.findOne({ include: [Model.Journal], where: { username: req.params.username, } }).then(user => {
        Model.Follow.findAll({ where: { UserId: user.id }, attributes: ['FollowerId'] }).then((listFollower) => {
            Model.Follow.findOne({ where: { UserId: req.session.UserId, FollowerId: user.id }, attributes: ['status'] }).then((status) => {
                let follow = listFollower.map((key) => {
                    return key.FollowerId
                })
                if (status == null) status = '';
                res.render('users/profile', {
                    title: user.username,
                    username: req.session.username,
                    UserId: req.session.UserId,
                    journals: user.Journals,
                    section: 'journals',
                    listfollower: follow,
                    status: status,
                })
            })
        })
    }).catch(error => {
        res.render('error/400', {
            title: 'ERROR BAD REQUEST',
            username: req.session.username,
            section: '',
            error: error
        });
    });
});

router.get('/follow/:username', auth, (req, res) => {
    Model.User.findOne({
            where: {
                username: req.params.username,
            }
        })
        .then(user => {
            Model.Follow.create({
                UserId: user.id,
                FollowerId: req.session.UserId,
                status: 'pending'
            }).then(() => {
                res.redirect(`/users/${user.username}`)
            }).catch((error) => {
                res.render('error/400', {
                    title: 'ERROR BAD REQUEST',
                    username: req.session.username,
                    section: '',
                    error: error
                });
            })
        })
});

router.get('/follow/:username/accept', auth, (req, res) => {
    Model.User.findOne({
            where: {
                username: req.params.username,
            }
        })
        .then(user => {
            Model.Follow.update({ status: 'accepted' }, { where: { FollowerId: user.id, } })
        }).then(() => {
            res.redirect(`/users/${user.username}`)
        }).catch((error) => {
            res.render('error/400', {
                title: 'ERROR BAD REQUEST',
                username: req.session.username,
                section: '',
                error: error
            });
        })
});


router.get('/block/:username', auth, (req, res) => {
    Model.User.findOne({ where: { username: req.params.username } }).then((user) => {
        Model.Follow.findOne({ where: { UserId: req.session.UserId, FollowerId: user.id } }).then((follower) => {
            if (follower == null) {
                Model.Follow.create({ UserId: req.session.UserId, FollowerId: user.id, status: 'blocked' }).then(() => {
                    res.redirect(`/users/${req.session.username}`)
                })
            }
            Model.Follow.update({ status: 'blocked' }, { where: { UserId: req.session.UserId, FollowerId: user.id } }).then(() => {
                res.redirect(`/users/${req.session.username}`)
            })
        }).catch(error => {
            res.render('error/400', {
                title: 'ERROR BAD REQUEST',
                username: req.session.username,
                section: '',
                error: error
            });
        })
    }).catch(error => {
        res.render('error/400', {
            title: 'ERROR BAD REQUEST',
            username: req.session.username,
            section: '',
            error: error
        });
    })
})

module.exports = router;