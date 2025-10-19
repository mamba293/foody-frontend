import jwt from 'jsonwebtoken';

const access_token = process.env.ACCESS_TOKENT_SECRET;
const refresh_token = process.env.EXPIRES_IN_TIME;

export const generateToken = (payload) => {
    return jwt.sign(payload, access_token, { expiresIn: "15m" });
};

// Middleware
export const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Invalid token format' });

    try {
        const decoded = jwt.verify(token, access_token);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Expired token' });
    }
};
