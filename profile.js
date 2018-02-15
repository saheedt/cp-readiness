const bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      csurf = require('csurf'),
      express = require('express'),
      extend = require('xtend'),
      forms = require('forms');

const collectFormErrors = require('express-stormpath/lib/helpers').collectFormErrors;


const profileForm = forms.create({
  firstname: forms.fields.string({
    required: true
  }),
  lastname: forms.fields.string({ required: true }),
  address: forms.fields.string(),
  city: forms.fields.string(),
  state: forms.fields.string()
});

function renderForm(req,res,locals){
  res.render('profile', extend({
    title: 'My Profile',
    csrfToken: req.csrfToken(),
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    address: req.user.customData.address,
    city: req.user.customData.city,
    state: req.user.customData.state
  },locals||{}));
}

module.exports = function profile(){

  const router = express.Router();

  router.use(cookieParser());

  router.use(bodyParser.urlencoded({ extended: true }));

  router.use(csurf({ cookie: true }));

  router.all('/', function(req, res) {
    profileForm.handle(req,{
      success: function(form){
        // The form library calls this success method if the
        // form is being POSTED and does not have errors

        // The express-stormpath library will populate req.user,
        // and then call save() on the user object:
        req.user.firstname = form.data.firstname;
        req.user.lastname = form.data.lastname;
        req.user.customData.address = form.data.address;
        req.user.customData.city = form.data.city;
        req.user.customData.state = form.data.state;
        req.user.customData.save();
        req.user.save(function(err){
          if(err){
            if(err.developerMessage){
              console.error(err);
            }
            renderForm(req,res,{
              errors: [{
                error: err.userMessage ||
                err.message || String(err)
              }]
            });
          }else{
            renderForm(req,res,{
              saved:true
            });
          }
        });
      },
      error: function(form){
        // The form library calls this method if the form
        // has validation errors.
        renderForm(req,res,{
          errors: collectFormErrors(form)
        });
      },
      empty: function(){
        // The form library calls this method if the
        // method is GET
        renderForm(req,res);
      }
    });
  });

  // This is an error handler for this router

  router.use(function (err, req, res, next) {
    if (err.code === 'EBADCSRFTOKEN'){
      if(req.user){
        renderForm(req,res,{
          errors:[{error:'Your form has expired.  Please try again.'}]
        });
      }else{
        // the user's cookies have been deleted,
        // send them back to the home page
        res.redirect('/');
      }
    }else{
      // Let the parent app handle the error
      return next(err);
    }
  });

  return router;
};
