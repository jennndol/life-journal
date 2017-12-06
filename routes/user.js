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
    }).catch((err) => {
        console.log(err);
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
            console.log(arr);
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
                .catch()
        })
        .catch(error => {
            res.send(error)
        });
});


router.get('/:username', (req, res) => {
    Model.User.findOne({
            include: [Model.Journal],
            where: {
                username: req.params.username,
            }
        }).then(user => {
            Model.Follow.findAll({
                where: {
                    UserId: user.id
                },
                attributes: ['FollowerId']
            }).then((listFollower) => {
                let follow = listFollower.map((key) => {
                    return key.FollowerId
                })
                res.render('users/profile', {
                    title: user.username,
                    username: req.session.username,
                    UserId: req.session.UserId,
                    journals: user.Journals,
                    section: 'journals',
                    listfollower: follow,
                })
            })
        })
        .catch(error => res.send(error));
});

router.get('/settings', auth, (req, res) => {
    Model.User.find({
        where: {
            id: req.session.UserId
        }
    }, {
        attributes: ['username']
    }).then(user => {
        res.render('users/setting', {
            title: 'Change Setting',
            username: req.session.username,
            section: 'users',
            user: user,
        })
    })
})

router.post('/settings', auth, (req, res) => {
    Model.User.find({
        where: {
            id: req.session.UserId
        }
    }).then(user => {
        if (req.body.newpassword == req.body.verifpassword) {
            user.login(req.body.oldpassword, (result) => {
                if (result) {
                    Model.User.update({
                        password: req.body.newpassword
                    }, {
                        where: {
                            id: req.session.UserId
                        }
                    }).then(() => {
                        res.send('Sukses')
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    console.log('&&&&&&& Old Password ga sama &&&&')
                }
            })
        } else {
            console.log('=== SALAH VERIF!!!!! =====')
        }
    })
})

router.get('/follow/:username', auth, (req, res) => {
    Model.User.findOne({
            username: req.params.username,
        })
        .then(user => {
            Model.Follow.create({
                UserId: user.id,
                FollowerId: req.session.UserId,
                status: 'pending'
            })
        }).then(() => {
            console.log(`${req.section.username} follows ${user.username}`);
            res.redirect(`/users/${user.username}`)
        }).catch((error) => {
            res.send(error)
        });
});

module.exports = router;