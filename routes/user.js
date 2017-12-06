const express = require('express');
const router = express.Router();
const Model = require('../models');
const auth = require('../helpers/auth');
const islogin = require('../helpers/islogin')

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


router.get('/signup', islogin, (req, res) => {
    res.render('users/signup', {
        title: 'Sign Up',
        username: req.session.username,
        section: 'users',
    })
});

router.post('/signup', islogin, (req, res) => {
    Model.User.create({
            username: req.body.username,
            password: req.body.password
        })
        .then(() => {
            res.redirect('/journals');
        })
        .catch(error => {
            res.send('error');
        });
});

router.get('/login', islogin, (req, res) => {
    res.render('users/login', {
        title: 'Login',
        username: req.session.username,
        section: 'users',
    });
});

router.get('/logout', auth, (req, res) => {
    req.session.destroy(err => {
        if (!err) {
            res.redirect('/users/login');
        } else {
            res.send(err);
        }
    })
});

router.post('/login', islogin, (req, res) => {
    Model.User.findOne({
        where: {
            username: req.body.username,
        }
    })
    .then((user) => {
        user.login(req.body.password, (result) => {
            if (result) {
                req.session.UserId = user.id;
                req.session.username = user.username;
                res.redirect(`/users/${req.session.username}`);
            } else {
                res.redirect('/users/login')
            }
        })
    })
    .catch(error => {
    	res.send(error);
    });
});

router.get('/followers', auth, (req, res) => {
	console.log('Masuk Route /followers');
	Model.Follow.findAll({
		where : {
			UserId : req.session.UserId
		}
	})
	.then(result => {
		console.log(result);
	})
	.catch(error => {
		res.send(error)
	});
});

router.get('/:username', auth, (req, res) => {
    Model.User.findOne({include: [Model.Journal], where: {username: req.params.username,}}).then(user => {
        Model.Follow.findAll({where: {UserId: user.id}, attributes:['FollowerId']}).then((listFollower)=>{
        	Model.Follow.findOne({where:{UserId: user.id, FollowerId:req.session.UserId},attributes:['status']}).then((status)=>{
        		let follow = listFollower.map((key)=>{
                return key.FollowerId
                })
                console.log(status, 'tipenya', typeof status)
                res.render('users/profile', {
                    title: user.username,
                    username: req.session.username,
                    UserId: req.session.UserId,
                    journals: user.Journals,
                    section: 'journals',
                    listfollower : follow,
                    status : status,
                })
        	})
        })            
    }).catch(error => res.send(error));
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

router.get('/follow/:username', auth, (req, res)=> {
	Model.User.findOne({where:{
			username: req.params.username,
		}})
	.then(user => {
		Model.Follow.create({
			UserId : user.id,
			FollowerId : req.session.UserId,
			status : 'pending'
		})
	}).then(()=>{
		console.log(`${req.section.username} follows ${user.username}`);
		res.redirect(`/users/${user.username}`)
	}).catch((error)=>{
        console.log(error)
		res.redirect(`/categories`)
	})
});

router.get('/block/:username', auth, (req, res) => {
	Model.User.findOne({where:{username: req.params.username}}).then((user)=>{
		Model.Follow.findOne({where:{UserId: req.session.UserId, FollowerId: user.id}}).then((follower)=>{
			if (follower == null) {
				Model.Follow.create({UserId: req.session.UserId, FollowerId: user.id, status: 'blocked'}).then(()=>{
					console.log('Ke create\nUserId', req.session.UserId, '\nFollowerId:',user.id)
					res.redirect(`/users/${req.session.username}`)
				})
			}
			Model.Follow.update({status: 'blocked'}, {where:{UserId: req.session.UserId, FollowerId: user.id}}).then(()=>{
				console.log('Ke update\nUserId', req.session.UserId, '\nFollowerId:',user.id)
				res.redirect(`/users/${req.session.username}`)
			})
		})
	})
})

module.exports = router;