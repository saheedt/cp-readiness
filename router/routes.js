
exports.routes = (app, basepath) => {
    app.route('/').get(function(req,res){
        res.status(200).sendFile(`${basepath}/views/index.html`);
    });
    app.route('/about').get(function(req,res){
        res.status(200).sendFile(`${basepath}/views/about.html`);
    });
    app.route('/contact').get(function(req,res){
        res.status(200).sendFile(`${basepath}/views/contact.html`);
    });
}
