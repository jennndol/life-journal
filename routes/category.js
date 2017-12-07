const express = require('express');
const router = express.Router();
const Model = require('../models');
const auth = require('../helpers/auth')

router.get('/', (req, res) => {
	Model.Category.findAll({ order: ['name'] }).then((categories) => {
		res.render('categories/index', {
			title: 'List Categories',
			categories: categories,
			username: req.session.username,
			section: 'categories',
		})
	}).catch(error => {
		res.render('error/400' {
			title: 'ERROR BAD REQUEST',
			username: req.session.username,
			section: '',
			error: error
		});
	})
})

router.get('/:id/journals', (req, res) => {
	Model.Category.findById(req.params.id, {
		include: Model.Journal,
		order: [
			[Model.Journal, 'title']
		]
	}).then((category) => {
		console.log(category.Journals.length)
		res.render('categories/journal', {
			title: 'List Journal of Categories',
			category: category,
			username: req.session.username,
			section: 'categories',
			error: null,
		})
	}).catch(error => {
		res.render('error/400' {
			title: 'ERROR BAD REQUEST',
			username: req.session.username,
			section: '',
			error: error
		});
	})
})

router.get('/add', auth, (req, res) => {
	res.render('categories/add', {
		title: 'Add New Category',
		username: req.session.username,
		section: 'categories',
		error: null,
	})
})

router.post('/add', auth, (req, res) => {
	Model.Category.create({ name: req.body.name }).then(() => {
		res.redirect('/categories')
	}).catch((err) => {
		res.render('categories/add', {
			title: 'Add New Category',
			username: req.session.username,
			section: 'categories',
			error: err,
		})
	})
})

router.get('/:id/edit', auth, (req, res) => {
	Model.Category.findById(req.params.id).then((category) => {
		res.render('categories/edit', {
			title: 'Edit Category',
			category: category,
			username: req.session.username,
			section: 'categories',
			error: null,
		})
	}).catch(error => {
		res.render('error/400' {
			title: 'ERROR BAD REQUEST',
			username: req.session.username,
			section: '',
			error: error
		});
	})
})

router.post('/:id/edit', auth, (req, res) => {
	Model.Category.findById(req.params.id).then((category) => {
		Model.Category.update({ id: req.params.id, name: req.body.name }, { where: { id: req.params.id } }).then(() => {
			res.redirect('/categories')
		}).catch((err) => {
			res.render('categories/edit', {
				title: 'Edit Category',
				category: category,
				username: req.session.username,
				section: 'categories',
				error: err,
			})
		})
	}).catch(error => {
		res.render('error/400' {
			title: 'ERROR BAD REQUEST',
			username: req.session.username,
			section: '',
			error: error
		});
	})
})

router.get('/:id/delete', auth, (req, res) => {
	Model.Category.destroy({ where: { id: req.params.id } }).then(() => {
		res.redirect('/categories')
	}).catch((error) => {
		res.render('error/400' {
			title: 'ERROR BAD REQUEST',
			username: req.session.username,
			section: '',
			error: error
		});
	})
})

module.exports = router;