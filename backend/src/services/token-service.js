import jwt from 'jsonwebtoken';
import "dotenv/config";

import Token from '../models/Token.js'
import ApiError from '../exceptions/api-error.js';

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.
            ACCESS_TOKEN_SECRET, { expiresIn: '30m' })
        const refreshToken = jwt.sign(payload, process.env.
            REFRESH_TOKEN_SECRET, { expiresIn: '15d' })
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({ where: { user_id: userId } })
        if (tokenData) {
            tokenData.refresh_token = refreshToken;
            return tokenData.save()
        }
        const token = await Token.create({ user_id: userId, refresh_token: refreshToken })
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await Token.deleteOne({ where: { refresh_token: refreshToken } })
        return tokenData;
    }

    async validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            returnuserData;
        } catch (e) {
            return null;
        }
    }
    async validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
            returnuserData;
        } catch (e) {
            return null;
        }
    }

    async findToken(refreshToken) {
        const tokenData = await Token.findOne({ where: { refresh_token: refreshToken } })
        // if (!tokenData) {
        //     throw ApiError.UnatuorizedError();
        // }
        return tokenData;
    }


}

export default new TokenService()