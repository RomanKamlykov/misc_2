module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if(req.isAuthenticated()) {
      next();
    } else {
      req.flash('error_msg', 'Please log in to view the resorse');
      res.redirect('/users/login');
    }
  }
}