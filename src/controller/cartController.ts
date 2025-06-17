import { Request, Response } from "express";
import { CartDao } from "dao/cart.dao";
import { RESPONSE_MESSAGES } from "constants/response";

const cartController = {
    getAllCarts: async (req: Request, res: Response): Promise<void> => {
        try {
            const carts = await CartDao.getAllCarts();
            res.status(200).json(RESPONSE_MESSAGES.SUCCESS.FETCH_CART(carts));
        } catch (error: any) {
            console.log(error);
            res.status(500).json(RESPONSE_MESSAGES.ERROR.INTERNAL_SERVER_ERROR);
        }
    },
    createCart: async (req: Request, res: Response): Promise<void> => {
        try {
            const { shop, stickyCartPosition, style, showProductCount, showTotal, backgroundColor, textColor, borderRadius, animation, drawerPosition, width, showRecommendations, showShippingBar, freeShippingThreshold } = req.body;
            const data = {
                shop,
                stickyCart: {
                    enabled: true,
                    position: stickyCartPosition,
                    style,
                    showProductCount,
                    showTotal,
                    backgroundColor,
                    textColor,
                    borderRadius,
                    animation
                },
                cartDrawer: {
                    enabled: true,
                    position: drawerPosition,
                    width,
                    showRecommendations,
                    showShippingBar,
                    freeShippingThreshold
                }
            };
            await CartDao.createCart(data);
            res.status(201).json(RESPONSE_MESSAGES.SUCCESS.CART_CREATED);
        } catch (error: any) {
            res.status(500).json(RESPONSE_MESSAGES.ERROR.INTERNAL_SERVER_ERROR);
        }
    },
    updateCart: async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const { stickyCart, cartDrawer, shop } = req.body;
            const data = {
                ...(stickyCart && { stickyCart }),
                ...(cartDrawer && { cartDrawer }),
                ...(shop && { shop })
            };
            await CartDao.updateCart(id, data);
            res.status(202).json(RESPONSE_MESSAGES.SUCCESS.CART_UPDATED);
        } catch (error) {
            console.log(error);
            res.status(500).json(RESPONSE_MESSAGES.ERROR.INTERNAL_SERVER_ERROR);
        }
    },
    updateCartStatus: async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const { type, status } = req.body;
            if (!['stickyCart', 'cartDrawer'].includes(type)) {
                res.status(400).json({ message: "Invalid type" });
                return;
            }
            await CartDao.updateCartEnabledStatus(id, type, status);
            res.status(202).json(RESPONSE_MESSAGES.SUCCESS.CART_STATUS_UPDATED);
        } catch (error) {
            console.log(error);
            res.status(500).json(RESPONSE_MESSAGES.ERROR.INTERNAL_SERVER_ERROR);
        }
    }
};

export default cartController;