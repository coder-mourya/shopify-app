import Joi from "joi";

export const createCartValidation = Joi.object({
    shop: Joi.string().required().example("my-shop.myshopify.com").messages({
        "string.empty": "Shop is required",
    }),

    // Sticky Cart fields
    stickyCartPosition: Joi.string()
        .valid("bottom-right", "bottom-left", "top-right", "top-left")
        .required()
        .example("bottom-right")
        .messages({
            "any.only": "Invalid sticky cart position",
            "string.empty": "Sticky cart position is required",
        }),

    style: Joi.string()
        .valid("floating", "inline")
        .required()
        .example("floating")
        .messages({
            "any.only": "Invalid sticky cart style",
            "string.empty": "Style is required",
        }),

    showProductCount: Joi.boolean().required().example(true),
    showTotal: Joi.boolean().required().example(true),

    backgroundColor: Joi.string()
        .pattern(/^#[0-9A-Fa-f]{6}$/)
        .required()
        .example("#00B167")
        .messages({
            "string.pattern.base": "Background color must be a valid hex color",
        }),

    textColor: Joi.string()
        .pattern(/^#[0-9A-Fa-f]{6}$/)
        .required()
        .example("#ffffff")
        .messages({
            "string.pattern.base": "Text color must be a valid hex color",
        }),

    borderRadius: Joi.number().min(0).required().example(8),

    animation: Joi.string()
        .valid("slide", "fade", "none")
        .required()
        .example("slide"),

    // Cart Drawer fields
    drawerPosition: Joi.string()
        .valid("right", "left")
        .required()
        .example("right")
        .messages({
            "any.only": "Invalid drawer position",
        }),

    width: Joi.number().min(100).max(1000).required().example(400),

    showRecommendations: Joi.boolean().required().example(true),

    showShippingBar: Joi.boolean().required().example(true),

    freeShippingThreshold: Joi.number().min(0).required().example(50),
});

export const ValidateCreateCart = (req: any, res: any, next: any) => {
    const { error } = createCartValidation.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }
    next();
};

export const updateCart = Joi.object({
    stickyCart: Joi.object({
        enabled: Joi.boolean().optional(),
        position: Joi.string().optional(),
        style: Joi.string().optional(),
        showProductCount: Joi.boolean().optional(),
        showTotal: Joi.boolean().optional(),
        backgroundColor: Joi.string().optional(),
        textColor: Joi.string().optional(),
        borderRadius: Joi.number().optional(),
        animation: Joi.string().optional()
    }).optional(),

    cartDrawer: Joi.object({
        enabled: Joi.boolean().optional(),
        position: Joi.string().optional(),
        width: Joi.number().optional(),
        showRecommendations: Joi.boolean().optional(),
        showShippingBar: Joi.boolean().optional(),
        freeShippingThreshold: Joi.number().optional()
    }).optional()
});


export const updateCartStatus = Joi.object({
    status: Joi.boolean().required().example(true),
    type: Joi.string().valid('stickyCart', 'cartDrawer').required().example('stickyCart')
})

export const ValidateUpdateStatus = (req: any, res: any, next: any) => {
    const { error } = updateCartStatus.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }
    next();
};