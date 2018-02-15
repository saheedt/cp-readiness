const express = require('express'),
stormpath = require('express-stormpath'),
app = express();

app.set('views', './views');
app.set('view engine', 'jade');

app.use(stormpath.init(app, {
  expand: {
    customData: true
  }
}));

app.get('/', stormpath.getUser, function(req, res) {
  res.render('home', {
    title: 'Welcome'
  });
});

app.on('stormpath.ready',function(){
  console.log('Stormpath Ready');
});

app.listen(3500);
