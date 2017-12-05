const express = require('express');
const app = express();
const bodyParser = require('body-parser');

/*Routing*/


app.set('view engine', 'ejs');
app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false })) ;
app.use(bodyParser.json());



app.use('/users', userRouter);

app.listen(3000, () => console.log('Journal app listening on port 3000!'));