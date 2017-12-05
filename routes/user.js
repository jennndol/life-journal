const express = require('express');
const router = express.Router();
const Model = require('../models')

router.get('/', (req, res) => {
    Model.User.findAll().then((users) => {
        res.render('users/index', {
            title: 'Users List',
            users: users,
        })
    }).catch((err) => {
        console.log(err);
    })
});

router.get('/signup', (req, res) => {
    res.render('users/signup', {
        title: 'Sign Up'
    })
});

router.post('/signup', (req, res)=>{
	Model.User.create({
		username : req.body.username,
		password : req.body.password
	})
	.then(()=>{
		res.send('SUDAH TERDAFTAR');
	})
	.catch(error => {
		console.log(error)
		res.send('error');
	});
});

router.get('/login', (req, res)=>{
	res.render('users/login', {
		title : 'Login'
	});
});

router.post('/login', (req, res)=>{
	Model.User.findOne({
		where : {
			username : req.body.username,
		}
	}).then((user)=>{
		user.login(req.body.password, (result) => {
			req.session.username = req.body.username;
			res.send(req.session);
		})
	})
});

module.exports = router;