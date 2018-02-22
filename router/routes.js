
exports.routes = (app, basepath) => {
    app.route('/').get(function(req,res){
        res.sendFile(`${basepath}/views/index.html`);
    });
    app.route('/about').get(function(req,res){
        res.sendFile(`${basepath}/views/about.html`);
    });
    app.route('/contact').get(function(req,res){
            res.sendFile(`${basepath}/views/contact.html`);
    });
}
