import jwt, { Secret } from "jsonwebtoken";
import { User } from "../model/user";
import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
    user?: string | object; // Modify this as per your User model
}

const protect = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    console.log('protecting');

    let token: string | undefined;
    token = req.cookies.jwt;

    if (token) {
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET as Secret);

            req.user = await User.findById((decode as { userId: string }).userId).select('-password');

            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
};

export { protect };