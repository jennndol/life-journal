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

router.get('/:username', (req, res) => {
    Model.User.findOne({
            include: [Model.Journal],
            where: {
                username: req.params.username,
            }
        })
        .then(user => {
            res.render('users/profile', {
                title: user.username,
                username: req.session.username,
                UserId: req.session.userId,
                journals: user.Journals,
                section: 'journals',
            })
        })
        .catch(error => res.send(error));
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

router.post('/login', islogin, (req, res) => {
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

router.get('/logout', auth, (req, res) => {
    req.session.destroy(err => {
        if (!err) {
            res.redirect('/journals');
        }
    })
});

module.exports = router;