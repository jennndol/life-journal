const express = require('express');
const router = express.Router();
const Model = require('../models')
const auth = require('../helpers/auth')

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
        title: 'Sign Up',
        username: req.session.username
    })
});

router.post('/signup', (req, res) => {
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

router.get('/login', (req, res) => {
    res.render('users/login', {
        title: 'Login',
        username: req.session.username,
    });
});

router.post('/login', (req, res) => {
    Model.User.findOne({
        where: {
            username: req.body.username,
        }
    }).then((user) => {
        user.login(req.body.password, (result) => {
            req.session.UserId = user.id;
            req.session.username = user.username;
            res.redirect('/journals');
        })
    })
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (!err) {
            res.redirect('/journals');
        }
    })
});

module.exports = router;