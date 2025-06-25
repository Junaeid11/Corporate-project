const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided or malformed header' });
  }
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      console.error('JWT verification error:', err.message);
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}; 