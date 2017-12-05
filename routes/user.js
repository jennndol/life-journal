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

module.exports = router;