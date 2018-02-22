const express = require('express'),
viewPath = './views',
routes = require('./router').routes
app = express(),
port = process.env.PORT || 3500;

app.set('views', viewPath);
app.set('view engine', 'html');

routes(app)
app.route('*').get((req, res) => res.status(404).send({
  message: 'invalid route!',
}));
app.route('*').post((req, res) => res.status(404).send({
  message: 'invalid route!',
}));
app.route('*').put((req, res) => res.status(404).send({
  message: 'invalid route!',
}));
app.route('*').delete((req, res) => res.status(404).send({
  message: 'invalid route!',
}));

app.listen(port);
