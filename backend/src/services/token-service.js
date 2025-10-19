import jwt from 'jsonwebtoken';
import "dotenv/config";

import Token from '../models/Token.js'

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
}

export default new TokenService()