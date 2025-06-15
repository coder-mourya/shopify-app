import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UserDAO } from "dao/userDao";
import { RESPONSE_MESSAGES } from "constants/response";

interface AuthRequest extends Request {
    user?: any; // Add user property
}


const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    // console.log("authMiddleware",req.headers.authorization?.split(" ") );
    
    const token = req.headers.authorization?.split(" ")[1];
    // console.log("token", token);

    if (!token) {
        res.status(401).json(RESPONSE_MESSAGES.ERROR.UNAUTHORIZED_ACCESS)
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload; // Replace with your secret key
        req.user = decoded; // Attach user info (e.g., user ID) to the request
        const user = await UserDAO.findById(decoded?.id)
        // console.log("user", user);
        
        if (!user || !user.isActive) {
            res.status(403).json(RESPONSE_MESSAGES.ERROR.INACTIVE_ACCOUNT);
            return;
        }
        next();
    } catch (error: any) {

        res.status(401).json(RESPONSE_MESSAGES.ERROR.UNAUTHORIZED_ACCESS);
        return
    }
};

export default authMiddleware;
