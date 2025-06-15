import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import prisma from "config/db.config";

const adminAuthMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // console.log("adminAuthMiddleware", req.headers.authorization?.split(" "));
    
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({ success: false, error: "Unauthorized: No token provided" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
        const admin = await prisma.adminUser.findUnique({
            where: { id: decoded.id },
        });

        if (!admin) {
            res.status(401).json({ success: false, error: "Unauthorized: Admin not found" });
            return;
        }

        req.user = admin;
        next();
    } catch (err) {
        res.status(401).json({ success: false, error: "Unauthorized: Invalid token" });
    }
};

export default adminAuthMiddleware;
