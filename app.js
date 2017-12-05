const express = require('express');
const app = express();
const bodyParser = require('body-parser');

/*Routing*/
const UserRouter = require('./routes/user');
const JournalRouter = require('./routes/journal');
const CategoryRouter = require('./routes/category');

app.set('view engine', 'ejs');
app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false })) ;
app.use(bodyParser.json());

app.use('/users', UserRouter);
app.use('/journals', JournalRouter);
app.use('/categories', CategoryRouter);

app.listen(3000, () => console.log('School app listening on port 3000!'));