import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export const createBannerValidation = Joi.object({
    name: Joi.string().required().example("Banner 1").messages({
        "string.empty": "Banner name is required",
    }),
    text: Joi.string().required().example("Banner 1").messages({
        "string.empty": "Banner text is required",
    }),
    textColor: Joi.string().required().example("red").messages({
        "string.empty": "Banner color is required",
    }),
    backgroundColor: Joi.string().required().example("white").messages({
        "string.empty": "Banner background color is required",
    }),
    position: Joi.string().required().example("top-left").messages({
        "string.empty": "Banner position is required",
    }),
    link: Joi.string().required().example("https://www.example.com").messages({
        "string.empty": "Banner link is required",
    }),
    fontSize: Joi.number().required().example(16).messages({
        "number.empty": "Banner font size is required",
    }),
    fontWeight: Joi.string().required().example("bold").messages({
        "string.empty": "Banner font weight is required",
    }),
    padding: Joi.number().required().example(16).messages({
        "number.empty": "Banner padding is required",
    }),
    animation: Joi.string().optional().allow("").example("fade"),
});

export const ValidateCreateBanner = (req: Request, res: Response, next: NextFunction) => {
    const { error } = createBannerValidation.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return
    }
    next();
};

export const updateBanner = Joi.object({
    name: Joi.string().optional().allow("").example("Banner 1"),
    text: Joi.string().optional().allow("").example("Banner 1"),
    textColor: Joi.string().optional().allow("").example("red"),
    backgroundColor: Joi.string().optional().allow("").example("white"),
    position: Joi.string().optional().allow("").example("top-left"),
    link: Joi.string().optional().allow("").example("https://www.example.com"),
    fontSize: Joi.number().optional().allow("").example(16),
    fontWeight: Joi.string().optional().allow("").example("bold"),
    padding: Joi.number().optional().allow("").example(16),
    animation: Joi.string().optional().allow("").example("fade"),
});

export const ValidateUpdateBanner = (req: Request, res: Response, next: NextFunction) => {
    const { error } = updateBanner.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return
    }
    next();
};

export const updateBannerStatus = Joi.object({
    status: Joi.boolean().required().example(true)
})

export const ValidateUpdateStatus = (req: Request, res: Response, next: NextFunction) => {
    const { error } = updateBannerStatus.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return
    }
    next();
};