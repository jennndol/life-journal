let authentication = (req, res, next) => {
	if(req.session.UserId){
		next();
	} else{
		res.redirect('/users/login');
	}
}

module.exports = authentication;



// if(req.session.UserId == req.params.userid){