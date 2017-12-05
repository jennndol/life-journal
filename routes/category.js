const express = require('express');
const router = express.Router();
const Model = require('../models')

router.get('/', (req, res) => {
	Model.Category.findAll({ order: ['name'] }).then((categories) => {
		res.render('categories/index', {
			title: 'List Categories',
			categories: categories,
		})
	})
})

router.get('/:id/journals', (req, res) => {
	Model.Category.findById(req.params.id, { include: Model.Journal, order: [
			
			[Model.Journal, 'title']
		] }).then((category) => {
		console.log(category.Journals)
		res.render('categories/journal', {
			title: 'List Journal of Categories',
			category: category,
		})
	})
})

router.get('/add', (req, res) => {
	res.render('categories/add', {
		title: 'Add New Category',
	})
})

router.post('/add', (req, res) => {
	Model.Category.create({ name: req.body.name }).then(() => {
		res.redirect('/categories')
	}).catch((err) => {
		console.log(err)
	})
})

router.get('/:id/edit', (req, res) => {
	Model.Category.findById(req.params.id).then((category) => {
		res.render('categories/edit', {
			title: 'Edit Category',
			category: category,
		})
	})
})

router.post('/:id/edit', (req, res) => {
	Model.Category.update({ id: req.params.id, name: req.body.name }, { where: { id: req.params.id } }).then(() => {
		res.redirect('/categories')
	}).catch((err) => {
		res.send(err)
	})
})

router.get('/:id/delete', (req, res) => {
	Model.Category.destroy({where: {id: req.params.id}}).then(() => {
		res.redirect('/categories')
	}).catch((err)=>{
		console.log(err);
	})
})

module.exports = router;