const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

/*Routing*/
const UserRouter = require('./routes/user');
const JournalRouter = require('./routes/journal');
const CategoryRouter = require('./routes/category');
const SearchRouter = require('./routes/search');
const CoreRouter = require('./routes/auth');

app.set('view engine', 'ejs');
app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use(session({
	secret: 'kucingmanis',
}));

app.use('/', CoreRouter);
app.use('/users', UserRouter);
app.use('/journals', JournalRouter);
app.use('/categories', CategoryRouter);
app.use('/search', SearchRouter);

app.listen(process.env.PORT || '3000')

// app.listen(3000, () => console.log('Life Journal app listening on port 3000!'));
