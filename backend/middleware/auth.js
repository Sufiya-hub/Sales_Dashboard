// const jwt = require('jsonwebtoken');

// module.exports = function (req, res, next) {
//   const token = req.header('x-auth-token');
//   if (!token) {
//     return res.status(401).json({ msg: 'No token, authorization denied' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
//     req.user = decoded.user;
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: 'Token is not valid' });
//   }
// };

const jwt = require('jsonwebtoken');

/**
 * Middleware to verify JWT and attach user data (ID and Role) to the request.
 * This supports the "Role-based authorization" requirement.
 */
module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token'); //

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' }); //
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret'); //

    // Attach the entire user object (id and role) to req.user
    // This allows subsequent routes to check req.user.role
    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' }); //
  }
};
