import createHttpError from 'http-errors';

const authenticate = (req, res, next) => {
  if (!req.session.userId) {
    return next(createHttpError(401, 'Authentication required'));
  }
  next();
};

const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.session.userId) {
      return next(createHttpError(401, 'Authentication required'));
    }
    
    if (roles.length && !roles.includes(req.session.userRole)) {
      return next(createHttpError(403, 'Insufficient permissions'));
    }
    
    next();
  };
};

export { authenticate, authorize };
