import { Response, Request } from "express";
import { RESPONSE_MESSAGES } from "../constants/response";
import { BadgeDao } from "dao/badge.dao";

const badgeController = {
    createBadge: async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, text, color, backgroundColor, position, products } = req.body;
            let data = { name, text, color, backgroundColor, position, products };
            await BadgeDao.createBadge(data);
            res.status(201).json(RESPONSE_MESSAGES.SUCCESS.BADGE_CREATED);
        } catch (error: any) {
            res.status(500).json(RESPONSE_MESSAGES.ERROR.INTERNAL_SERVER_ERROR);
        }
    },
    getAllBadges: async (req: Request, res: Response): Promise<void> => {
        try {
            const badges = await BadgeDao.getAllBadges();
            res.status(200).json(RESPONSE_MESSAGES.SUCCESS.FETCH_BADGE(badges));
        } catch (error: any) {
            res.status(500).json(RESPONSE_MESSAGES.ERROR.INTERNAL_SERVER_ERROR);
        }
    },
    updateBadge: async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const { name, text, color, backgroundColor, position, products } = req.body;
            let data = { name, text, color, backgroundColor, position, products };
            await BadgeDao.updateBadge(id, data);
            res.status(202).json(RESPONSE_MESSAGES.SUCCESS.BADGE_UPDATED);
        } catch (error) {
            res.status(500).json(RESPONSE_MESSAGES.ERROR.INTERNAL_SERVER_ERROR);
        }

    },
    deleteBadge: async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            await BadgeDao.deleteBadge(id);
            res.status(200).json(RESPONSE_MESSAGES.SUCCESS.BADGE_DELETED);
        } catch (error) {
            res.status(500).json(RESPONSE_MESSAGES.ERROR.INTERNAL_SERVER_ERROR);
        }
    },
    updateStatus: async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            await BadgeDao.updateStatus(id, status);
            res.status(202).json(RESPONSE_MESSAGES.SUCCESS.BADGE_STATUS_UPDATED);
        } catch (error) {
            
        }
     },
};

export default badgeController;