
require('dotenv').config()

const express = require('express');
const expressEdge = require('express-edge');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOveride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LoaclStrategy = require('passport-local').Strategy;

const idea_routes = require('./routes/idea_routes');
const auth_routes = require('./routes/auth_routes');

require('./config/passport')(passport);

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

// passport middlewares
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});



app.use('/ideas', idea_routes);
app.use('/auth', auth_routes);

app.get('/', (req, res) => {
    res.render('index');
});

app.use((req, res) => {
    res.render('404');
});


app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`);
});