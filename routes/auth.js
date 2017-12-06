const express = require('express');
const router = express.Router();
const Model = require('../models');
const auth = require('../helpers/auth');
const islogin = require('../helpers/islogin')


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
            res.redirect('/login');
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
                    res.redirect('/login')
                }
            })
        })
        .catch(error => {
            res.send(error);
        });
});

module.exports = router;