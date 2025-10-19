import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.ACCESS_TOKENT_SECRET || 'labubu';
const EXPIRES_IN = process.env.EXPIRES_IN_TIME || '1h';

export const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });
};



// Middleware
export const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Invalid token format' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};
