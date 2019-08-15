module.exports = {
    //middleware to check if user is authenticated
    isAuthenticated: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg', 'Action Not Allowed');
        res.redirect('/auth/login');
    },
    // middleware to check if user is not authenticated
    isNotAuthenticated: function(req, res, next){
        if(!req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg', 'Action Not Allowed');
        res.redirect('/');
    }
};