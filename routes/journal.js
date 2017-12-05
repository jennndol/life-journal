const express = require('express');
const router = express.Router();
const models = require('../models');
const auth = require('../helpers/auth');

router.get('/', auth, (req, res) => {
    models.Journal.findAll({
            include: [models.User]
        })
        .then(journals => {
            journals.forEach(result => {
                console.log(result.User);
            });
            res.render('journals/index', {
                username: req.session.username,
                title: 'Journals',
                journals: journals
            });
        })
        .catch(err => res.send(err));
});

router.get('/add', (req, res) => {
    res.render('journals/add', {
        title: 'Add Journal',
        username: req.session.username,
    });
});

router.post('/add', (req, res) => {
    models.Journal.create({
        title: req.body.title,
        content: req.body.content,
        userId: 2,
        happenedAt: req.body.happenedAt
    }).then(() => {
        res.redirect('/journals');
    }).catch(error => {
        res.send(error)
    })
});

router.get('/edit/:id/:userid', auth, (req, res) => {
    models.Journal.findById(req.params.id)
        .then(journal => {
            res.render('journals/edit', {
                title: `Edit: ${journal.title}`,
                journal: journal,
                username: req.session.username
            });
        })
        .catch(error => res.send(error))
});

router.post('/edit/:id', (req, res) => {
    models.Journal.update({
            title: req.body.title,
            content: req.body.content,
            happenedAt: req.body.happenedAt,
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(() => res.redirect('/journals'))
        .catch(err => res.send(err));
});

router.get('/delete/:id', (req, res) => {
    models.Journal.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            res.redirect('/journals');
        })
        .catch(error => {
            res.send(error)
        });
});

module.exports = router;