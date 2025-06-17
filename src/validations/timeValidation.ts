import { Request, Response, NextFunction } from "express";
import Joi, { string } from "joi";

export const createTimerValidation = Joi.object({
    name: Joi.string().required().example("Flash Sale Timer").messages({
        "string.empty": "Timer name is required",
    }),

    endTime: Joi.date().required().example("2024-12-31T23:59:59").messages({
        "string.empty": "End time is required",
    }),

    style: Joi.string().required().example("modern").messages({
        "string.empty": "Style is required",
    }),

    position: Joi.string().required().example("product-page").messages({
        "string.empty": "Position is required",
    }),

    backgroundColor: Joi.string().required().example("#ff4d4f").messages({
        "string.empty": "Background color is required",
    }),

    textColor: Joi.string().required().example("#ffffff").messages({
        "string.empty": "Text color is required",
    }),

    fontSize: Joi.number().min(10).max(100).required().example(18).messages({
        "number.base": "Font size must be a number",
        "number.min": "Font size must be at least 10",
        "number.max": "Font size must be at most 100",
    }),

    showDays: Joi.boolean().required().example(true),
    showHours: Joi.boolean().required().example(true),
    showMinutes: Joi.boolean().required().example(true),
    showSeconds: Joi.boolean().required().example(true),
    products: Joi.array().items(Joi.string()).min(1).required().example(["1", "2", "3"]).messages({
        "array.base": "Products must be an array of product IDs",
        "array.min": "At least one product is required",
    }),
});

export const ValidateCreateTimer = (req: Request, res: Response, next: NextFunction) => {
    const { error } = createTimerValidation.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }
    next();
};

export const updateTimer = Joi.object({
    name: Joi.string().optional().allow("").example("Flash Sale Timer"),
    endTime: Joi.date().optional().allow("").example("2024-12-31T23:59:59"),
    style: Joi.string().optional().allow("").example("modern"),
    position: Joi.string().optional().allow("").example("product-page"),
    backgroundColor: Joi.string().optional().allow("").example("#ff4d4f"),
    textColor: Joi.string().optional().allow("").example("#ffffff"),
    fontSize: Joi.number().optional().allow("").example(18),
    showDays: Joi.boolean().optional().example(true),
    showHours: Joi.boolean().optional().example(true),
    showMinutes: Joi.boolean().optional().example(true),
    showSeconds: Joi.boolean().optional().example(true),
    products: Joi.array().items(Joi.string()).optional().allow("").example(["1", "2", "3"]),
})

export const updateTimerStatus = Joi.object({
    status: Joi.boolean().required().example(true),
})

export const ValidateUpdateStatus = (req: Request, res: Response, next: NextFunction) => {
    const { error } = updateTimerStatus.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }
    next();
};