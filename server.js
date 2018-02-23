const express = require('express'),
app = express(),
path = require('path'),
port = process.env.PORT || 3500;

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

const routes = require('./router/routes').routes;
routes(app, `${__dirname}`);

app.route('*').get((req, res) => res.status(404).sendFile(`${__dirname}/views/404.html`))
app.route('*').post((req, res) => res.status(404).sendFile(`${__dirname}/views/404.html`))
app.route('*').put((req, res) => res.status(404).sendFile(`${__dirname}/views/404.html`))
app.route('*').delete((req, res) => res.status(404).sendFile(`${__dirname}/views/404.html`))

app.listen(port,function(){
  console.log(`Live at Port ${port}`);
});

