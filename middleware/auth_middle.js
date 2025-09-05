// middleware/authenticate.js
import jwt from 'jsonwebtoken';
import errorLogger from '../helpers/error_logger.js';

export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check for authorization header
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
            success: false, 
            message: 'Authorization token missing or malformed' 
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Use the same secret key as used in token generation
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

        // Attach user data to request
        req.user = {};

        // If user token
        if (decoded.user_id) {
            req.user.user_id = decoded.user_id;
            req.user.email = decoded.email;
            req.user.role = decoded.role;
        }

        // If employee token
        if (decoded.employee_id) {
            req.user.employee_id = decoded.employee_id;
            req.user.organisation_id = decoded.organisation_id;
            req.user.email = decoded.email;
            // Optionally add role if present
            if (decoded.role) req.user.role = decoded.role;
        }

        // If neither, reject
        if (!req.user.user_id && !req.user.employee_id) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid token: no user or employee information found'
            });
        }

        next();
    } catch (error) {
        errorLogger.error(`Token verification failed: ${error.message}`);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                success: false, 
                message: 'Token has expired',
                error: 'TOKEN_EXPIRED'
            });
        }
        return res.status(401).json({ 
            success: false, 
            message: 'Invalid token',
            error: 'INVALID_TOKEN'
        });
    }
};

