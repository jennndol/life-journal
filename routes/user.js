const express = require('express');
const router = express.Router();
const Model = require('../models')

router.get('/', (req, res) => {
    Model.User.findAll().then((users)=>{
    	res.render('users/index', {
    		title : 'Users List',
    		users : users,
    	})
    }).catch((err)=>{
    	console.log(err);
    })
});

module.exports = router;