import bcrypt from "bcrypt"
import { v4 as uuidv4 } from 'uuid';


import User from '../models/User.js'
import mailService from "./mail-service.js";
import tokenService from "./token-service.js";
import UserDto from "../dtos/user-dtos.js";

class UserService {
    async registration(email, phone, password) {
        const candidate = await User.findOne({ where: { email } })
        if (candidate) {
            throw new Error(`User with ${email} already registered`)
        }
        const hash_password = await bcrypt.hash(password, 5)
        const activationLink = uuidv4();
        const user = await User.create({
            email,
            phone_number: phone,
            hash_password,
            activation_link: activationLink
        })
        await mailService.sendActivateMail(email, activationLink)

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