const express = require('express');
const router = express.Router();
const Model = require('../models');
const Sequelize = require('sequelize')
const Op = Sequelize.Op

router.get('/', (req, res) => {
    res.render('search/index', {
        title: 'Search',
        username: req.params.username,
        section: 'search',
        users: []
    });
});

router.post('/', (req, res) => {
    Model.User.findAll({
        where: {
            username: {
                [Op.iLike]: `%${req.body.q}%` }
        }
    }).then(users => {
        res.render('search/index', {
            title: 'Search',
            username: req.params.username,
            section: 'search',
            users: users
        })
    })
});

module.exports = router