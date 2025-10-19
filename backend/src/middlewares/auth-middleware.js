import ApiError from '../exceptions/api-error.js'
import tokenService from '../services/token-service.js';

export default function (req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return next(ApiError.UnatuorizedError())
        }

        const accessToken = authHeader.split(" ")[1];
        if (!accessToken) {
            return next(ApiError.UnatuorizedError())
        }

        const userData = tokenService.validateAccessToken(accessToken)

        if(!userData){
            throw next(ApiError.UnatuorizedError())
        }

        req.user = userData
        next();
    } catch (e) {
        return next(ApiError.UnatuorizedError())
    }
}