import express from "express";
import { auth } from "../middleware/Auth.js";
import { USER } from "../controllers/UserCon.js";

export const UserRt = express.Router();
    UserRt.post("/register", USER.Register);
    UserRt.get("/", USER.FetchAll);
    UserRt.post("/login", USER.Login);
    UserRt.delete("/logout", auth, USER.Logout);



    