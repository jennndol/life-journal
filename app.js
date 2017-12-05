const express = require('express');
const app = express();
const bodyParser = require('body-parser')

/*Routing*/
const userRouter = require('./routes/user');
const journalRouter = require('./routes/journal');
const categoryRouter = require('./routes/category');

app.set('view engine', 'ejs');
app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())

app.listen(3000, () => console.log('School app listening on port 3000!'));