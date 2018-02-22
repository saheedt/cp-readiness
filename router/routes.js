const viewPath = '../views';
const Routes = (app) => {
    app.route('/').get(function(req,res){
        res.sendFile(`${viewPath}/index.html`);
    });
    app.route('/about').get(function(req,res){
        res.sendFile(`${viewPath}/about.html`);
    });
    app.route('/contact').get(function(req,res){
        res.sendFile(`${viewPath}/contact.html`);
    });
}

module.exports = Routes