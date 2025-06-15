import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export const createBadgeValidation = Joi.object({
  name: Joi.string().required().example("Badge 1").messages({
    "string.empty": "Badge name is required",
  }),
  text: Joi.string().required().example("Badge 1").messages({
    "string.empty": "Badge text is required",
  }),
  color: Joi.string().required().example("red").messages({
    "string.empty": "Badge color is required",
  }),
  backgroundColor: Joi.string().required().example("white").messages({
    "string.empty": "Badge background color is required",
  }),
  position: Joi.string().required().example("top-left").messages({
    "string.empty": "Badge position is required",
  }),
  products: Joi.array().items(Joi.string()).required().example(["prod1", "prod2"]).messages({
    "array.empty": "Badge products is required",
  }),
});

export const ValidateCreateBadge = (req: Request, res: Response, next: NextFunction) => {
    const { error } = createBadgeValidation.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return
    }
    next();
}

export const updateBadge = Joi.object({
    name: Joi.string().optional().allow("").example("Badge 1"),
    text: Joi.string().optional().allow("").example("Badge 1"),
    color: Joi.string().optional().allow("").example("red"),
    backgroundColor: Joi.string().optional().allow("").example("white"),
    position: Joi.string().optional().allow("").example("top-left"),
    products: Joi.array().items(Joi.string()).optional().allow("").example(["prod1", "prod2"]),
})

export const ValidateUpdateBadge = (req: Request, res: Response, next: NextFunction) => {
    const { error } = updateBadge.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return
    }
    next();
}

export const updateStatus = Joi.object({
    status: Joi.boolean().required().example(true)
})

export const ValidateupdateStatus = (req: Request, res: Response, next: NextFunction) => {
    const { error } = updateStatus.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return
    }
    next();
}