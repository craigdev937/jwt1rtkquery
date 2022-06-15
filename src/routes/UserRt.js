import express from "express";
import { IndexHome } from "../controllers/UserCon.js";

export const UserRt = express.Router();
    UserRt.get("/", IndexHome);



    