import "dotenv/config";
import { validationResult } from "express-validator";

import ApiError from "../exceptions/api-error.js";
import userService from "../services/user-service.js"

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Validation Error", errors.array()))
            }
            const { email, phone, password } = req.body;
            const userData = await userService.registration(email, phone, password)
            res.cookie("refreshToken", userData.refreshToken, { maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password)
            res.cookie("refreshToken", userData.refreshToken, { maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie("refreshToken")
            res.json(token).status(200);
        } catch (e) {
            next(e)
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link
            await userService.activate(activationLink)
            return res.redirect(`${process.env.CLIENT_URL}/dashboard`)
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken)
            res.cookie("refreshToken", userData.refreshToken, { maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (e) {

        }
    }

}

export default new UserController()