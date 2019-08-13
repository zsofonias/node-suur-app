
require('dotenv').config()

const express = require('express');
const expressEdge = require('express-edge');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOveride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');


const idea_routes = require('./routes/idea_routes');
const auth_routes = require('./routes/auth_routes');

const app = express();

mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true});

app.use(express.static('public'));
app.use(expressEdge);
app.set('views', `${__dirname}/views`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOveride('_method')); // method override config 


app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');

    next();
});



app.use('/ideas', idea_routes);
app.use('/auth', auth_routes);

app.get('/', (req, res) => {
    res.render('index');
});

app.use((req, res) => {
    res.send('404, Page not Found');
});


app.listen(3000, () => {
    console.log('Server running on 3000');
});