const express = require('express');
const router = express.Router();
const Model = require('../models');
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const auth = require('../helpers/auth');

router.get('/', auth, (req, res) => {
    res.render('search/index', {
        title: 'Search',
        username: req.session.username,
        section: 'search',
        users: []
    });
});

router.post('/', auth, (req, res) => {
    Model.User.findAll({
        where: {
            username: {
                [Op.iLike]: `%${req.body.q}%`
            }
        }
    }).then(users => {
        res.render('search/index', {
            title: 'Search',
            username: req.sesson.username,
            section: 'search',
            users: users
        })
    }).catch(error => {
        res.render('error/400', {
            title: 'ERROR BAD REQUEST',
            username: req.session.username,
            section: '',
            error: error
        });
    })
});

module.exports = router