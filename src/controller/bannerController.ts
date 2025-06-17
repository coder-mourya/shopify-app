import { Request, Response } from "express";
import { BannerDao } from "dao/banner.dao";
import { RESPONSE_MESSAGES } from "constants/response";
import { updateStatus } from "validations/badgeValidation";

const bannerController = {
    getAllBanners: async (req: Request, res: Response): Promise<void> => {
        try {
            const banners = await BannerDao.getAllBanners();
            res.status(200).json(RESPONSE_MESSAGES.SUCCESS.FETCH_BANNER(banners));
        } catch (error: any) {
            res.status(500).json(RESPONSE_MESSAGES.ERROR.INTERNAL_SERVER_ERROR);
        }
    },
    createBanner: async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, text, backgroundColor, textColor, position,  link, fontSize, fontWeight, padding, animation, } = req.body;
            let data = { name, text, backgroundColor, textColor, position,  link, fontSize, fontWeight, padding, animation };
            await BannerDao.createBanner(data);
            res.status(201).json(RESPONSE_MESSAGES.SUCCESS.BANNER_CREATED);
        } catch (error: any) {
            res.status(500).json(RESPONSE_MESSAGES.ERROR.INTERNAL_SERVER_ERROR);
        }
    },
    updateBanner: async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const { name, text, backgroundColor, textColor, position, enabled, link, fontSize, fontWeight, padding, animation } = req.body;
            let data = { name, text, backgroundColor, textColor, position, enabled, link, fontSize, fontWeight, padding, animation };
            await BannerDao.updateBanner(id, data);
            res.status(202).json(RESPONSE_MESSAGES.SUCCESS.BANNER_UPDATED);
        } catch (error) {
            res.status(500).json(RESPONSE_MESSAGES.ERROR.INTERNAL_SERVER_ERROR);
        }
    },
    deleteBanner: async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            await BannerDao.deleteBanner(id);
            res.status(200).json(RESPONSE_MESSAGES.SUCCESS.BANNER_DELETED);
        } catch (error) {
            res.status(500).json(RESPONSE_MESSAGES.ERROR.INTERNAL_SERVER_ERROR);
        }
    },
    updateStatus: async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            await BannerDao.updateStatus(id, status);
            res.status(202).json(RESPONSE_MESSAGES.SUCCESS.BANNER_STATUS_UPDATED);
        } catch (error) {
            res.status(500).json(RESPONSE_MESSAGES.ERROR.INTERNAL_SERVER_ERROR);
        }
    }
};

export default bannerController;