const express = require('express');
const router = express.Router();
const models = require('../models');
const auth = require('../helpers/auth');
const Sequelize = require('sequelize');
const Op = Sequelize.Op

router.get('/', auth, (req, res) => {
    models.Follow.findAll({
            where: {
                FollowerId: req.session.UserId,
                status: 'accepted',
            }
        })
        .then(follows => {
            let UserIdJournalToShow = [];
            UserIdJournalToShow.push(req.session.UserId);
            follows.forEach(follow => {
                UserIdJournalToShow.push(follow.UserId);
            });
            models.Journal.findAll({
                    include: [models.User],
                    where: {
                        UserId: {
                            [Op.any]: [UserIdJournalToShow]
                        }
                    }
                })
                .then(journals => {
                    res.render('journals/index', {
                        username: req.session.username,
                        title: 'Journals',
                        journals: journals,
                        section: 'journals',
                    });
                })
                .catch(error => {
                    res.render('error/400', {
                        title: 'ERROR BAD REQUEST',
                        username: req.session.username,
                        section: '',
                        error: error
                    });
                });
        })
        .catch(error => {
            res.render('error/400', {
                title: 'ERROR BAD REQUEST',
                username: req.session.username,
                section: '',
                error: error
            });
        });
});

router.get('/show/:id', (req, res) => {
    models.Journal.findById(req.params.id, {
        include: [models.User]
    }).then((journal) => {
        res.render('journals/show', {
            title: journal.title,
            section: 'journals',
            username: req.session.username,
            journal: journal,
        })
    }).catch(error => {
        res.render('error/400', {
            title: 'ERROR BAD REQUEST',
            username: req.session.username,
            section: '',
            error: error
        });
    })
})

router.get('/add', auth, (req, res) => {
    res.render('journals/add', {
        title: 'Add Journal',
        username: req.session.username,
        section: 'journals',
        error: null,
    });
});

router.post('/add', auth, (req, res) => {
    models.Journal.create({
        title: req.body.title,
        content: req.body.content,
        UserId: req.session.UserId,
        happenedAt: req.body.happenedAt
    }).then(() => {
        res.redirect('/journals');
    }).catch(error => {
        res.render('journals/add', {
            title: 'Add Journal',
            username: req.session.username,
            section: 'journals',
            error: error,
        });
    })
});

router.get('/edit/:id/:userid', auth, (req, res) => {
    models.Journal.findById(req.params.id)
        .then(journal => {
            res.render('journals/edit', {
                title: `Edit: ${journal.title}`,
                journal: journal,
                username: req.session.username,
                section: 'journals',
                error: null,
            });
        })
        .catch(error => {
            res.render('error/400', {
                title: 'ERROR BAD REQUEST',
                username: req.session.username,
                section: '',
                error: error
            });
        })
});

router.post('/edit/:id', auth, (req, res) => {
    models.Journal.findById(req.params.id).then(journal => {
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
            .catch(err => {
                res.render('journals/edit', {
                    title: `Edit: ${journal.title}`,
                    journal: journal,
                    username: req.session.username,
                    section: 'journals',
                    error: err,
                });
            });
    }).catch(error => {
        res.render('error/400', {
            title: 'ERROR BAD REQUEST',
            username: req.session.username,
            section: '',
            error: error
        });
    })
});

router.get('/delete/:id', auth, (req, res) => {
    models.Journal.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            res.redirect('/journals');
        })
        .catch(error => {
            res.render('error/400', {
                title: 'ERROR BAD REQUEST',
                username: req.session.username,
                section: '',
                error: error
            });
        });
});

module.exports = router;