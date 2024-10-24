import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.JWT_SECRET;  // Same secret key used for signing JWTs

// Middleware function to verify the token
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];  // Extract the token part from "Bearer <token>"

  try {
    const decoded = jwt.verify(token, SECRET_KEY);  // Verify the token
    req.userId = decoded.id;  // Attach the decoded user ID to the request
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};