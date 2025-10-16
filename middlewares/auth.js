export const isLoggedIn = (req, res, next) => {
  if (req.session.isLoggedIn) return next();
  res.redirect('/login');
};

export const isAdmin = (req, res, next) => {
  if (req.session.isLoggedIn && req.session.user?.isAdmin) return next();
  res.redirect('/login');
};

export const isUser = (req, res, next) => {
  if (req.session.isLoggedIn && req.session.user && !req.session.user.isAdmin) return next();
  res.redirect('/');
};
