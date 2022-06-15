import { UserModel } from "../models/Users.js";

class UserClass {
    Register = async (req, res, next) => {
        const { name, email, password } = req.body;
        try {
            const user = await UserModel.create({
                name, email, password
            });
            return res.status(201).json(user);
        } catch (error) {
            res.status(400).json({msg: error.message});
            next(error);
        }
    };

    Login = async (req, res, next) => {
        const { email, password } = req.body;
        try {
            const user = 
                await UserModel.findByCredentials(email, password);
            const token = await user.generateAuthToken();
            res.status(201).json({user, token});
        } catch (error) {
            res.status(400).json({msg: error.message});
            next(error);
        }
    };

    Logout = async (req, res, next) => {
        try {
            req.user.tokens = 
            req.user.tokens.filter((tokenObj) => {
                return tokenObj.token !== req.token;
            });
        } catch (error) {
            res.status(400).json({msg: error.message});
            next(error);
        }
    };

    FetchAll = async (req, res, next) => {
        try {
            await UserModel.find()
            .then((users) => res.status(200)
            .json(users));
        } catch (error) {
            res.status(400).json({msg: error.message});
            next(error);
        }
    };
};

export const USER = new UserClass();



