

const getLogin = (req, res, next) => {
    res.render('login');
};

const register = (req, res, next) => {
    res.render('register');
};


const logout = (req, res, next) => {
    res.send('U are loggdd out');
};


module.exports = {
    getLogin: getLogin,
    logout: logout,
    register: register,
};