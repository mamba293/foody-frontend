import bcrypt from "bcrypt"
import { v4 as uuidv4 } from 'uuid';
import "dotenv/config";

import User from '../models/User.js'
import mailService from "./mail-service.js";
import tokenService from "./token-service.js";
import UserDto from "../dtos/user-dtos.js";
import ApiError from "../exceptions/api-error.js";


class UserService {
    async registration(email, phone, password) {
        const candidate = await User.findOne({ where: { email } })
        if (candidate) {
            throw ApiError.BadRequest(`User with ${email} already registered`)
        }
        const hash_password = await bcrypt.hash(password, 5)
        const activationLink = uuidv4();
        const user = await User.create({
            email,
            phone_number: phone,
            hash_password,
            activation_link: activationLink
        })
        await mailService.sendActivateMail(email, `${process.env.API_URL}/api/users/activate/${activationLink}`)

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async activate(activation_link) {
        const user = await User.findOne({ where: { activation_link } })
        if (!user) {
            throw ApiError.BadRequest("User is not defined")
        }
        user.is_activated = true;
        await user.save();
    }

        async login(email, password) {
            const user = await User.findOne({ where: { email } })
            if (!user) {
                throw ApiError.BadRequest(`User is not registered`)
            }

            const isPassEquals = await bcrypt.compare(password, user.hash_password)
            if (!isPassEquals) {
                throw ApiError.BadRequest(`Password is not valide`)
            }
            const userDto = new UserDto(user);
            const tokens = tokenService.generateTokens({ ...userDto })

            await tokenService.saveToken(userDto.id, tokens.refreshToken)

            return {
                ...tokens,
                user: userDto
            }
        }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnatuorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnatuorizedError();
        }

        const user = await User.findByPk(userData.user_id);
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }


}

export default new UserService()