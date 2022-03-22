
exports.home = function(req, res){
    res.render("home.hbs");
};
exports.about = function(req, res){
    res.send("About");
}