let islogin = (req, res, next) => {
	if (req.session.username) {
		res.redirect('back');
	} else {
		next();
	}
};

module.exports = islogin;