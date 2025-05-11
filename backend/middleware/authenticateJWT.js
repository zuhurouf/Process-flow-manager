const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  // Retrieve the token from the Authorization header
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(403).json({ error: 'No token provided' });
  }
  
  // Token format: "Bearer <token>"
  const token = authHeader.split(' ')[1];

  // Verify the token. Replace 'your-secret-key' with your actual secret,
  // or better, use an environment variable (process.env.JWT_SECRET)
  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token invalid' });
    }
    // If verification succeeds, attach the decoded user info to the request object.
    req.user = user;
    next();
  });
};

module.exports = authenticateJWT;
