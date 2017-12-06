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
                .catch(err => res.send(err));
        })
        .catch(error => res.send(error));
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
    })
})

router.get('/add', auth, (req, res) => {
    res.render('journals/add', {
        title: 'Add Journal',
        username: req.session.username,
        section: 'journals',
    });
});

router.post('/add', auth, (req, res) => {
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
                username: req.session.username,
                section: 'journals',
            });
        })
        .catch(error => res.send(error))
});

router.post('/edit/:id', auth, (req, res) => {
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
            res.send(error)
        });
});

module.exports = router;