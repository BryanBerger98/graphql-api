import { Request, Response } from "express";
import User from "./users/User.interface";

export default interface GQLContext extends Request {
    res: Response
}