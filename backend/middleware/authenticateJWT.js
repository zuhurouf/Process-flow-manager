const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  // Retrieve the token from the Authorization header
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(403).json({ error: 'No token provided' });
  }
  
  // Token format: "Bearer <token>"
  const token = authHeader.split(' ')[1];
  // Verify the token
  jwt.verify(token, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDY5NzM4OTYsImV4cCI6MTc0Njk3NzQ5Nn0.FiDD3trEIbeyNb8GJzdsYxWhSyzlV8IDoMFwTxqahZU', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token invalid' });
    }
    // If verification succeeds, attach the decoded user info to the request object.
    req.user = user;
    next();
  });
};

module.exports = authenticateJWT;
