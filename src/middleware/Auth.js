import jwt from "jsonwebtoken";
import { UserModel } from "../models/Users.js";

export const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")
            .replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findOne({
            _id: decoded._id,
        });
        if (!user) throw new Error("Please authenticate");
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({msg: error.message});
        next(error);
    }
};


