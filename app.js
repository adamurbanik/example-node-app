var express = require('express');
const bodyParser = require('body-parser');


let app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


app.get('/', function (req, res) {
  res.render('home');
});

app.get('/thank-you', function (req, res) {
  res.render('thank-you');
});

app.post('/process', function (req, res) {
  console.log('Form (from querystring): ' + req.query.form); 
  console.log('Name (from visible form field): ' + req.body.name); 
  console.log('Email (from visible form field): ' + req.body.email); 
  res.redirect(303, '/thank-you');
});

app.get('/process', function (req, res) {
  console.log('Form (from querystring): ' + req.query.form); 
  console.log('Name (from visible form field): ' + req.body.name); 
  console.log('Email (from visible form field): ' + req.body.email); 
  res.redirect(303, '/thank-you');
});

// 404 catch-all handler (middleware)
app.use(function (req, res, next) {
  res.status(404);
  res.send('404');
});

// 500 error handler (middleware)
app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500);
  res.send('500');
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.');
});