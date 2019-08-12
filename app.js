const express = require('express');
const expressEdge = require('express-edge');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const idea_routes = require('./routes/idea_routes');

const app = express();

// mongoose.connect('mongodb://localhost/suur', {
//     useMongoClient: true,
// }).then(() => console.log('Mongo databse connected'))
// .catch((err) => console.log(err));
mongoose.connect('mongodb://localhost:27017/suur_db', {useNewUrlParser: true});



app.use(express.static('public'));
app.use(expressEdge);
app.set('views', `${__dirname}/views`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



app.use('/ideas', idea_routes);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});


app.listen(3000, () => {
    console.log('Server running on 3000');
});