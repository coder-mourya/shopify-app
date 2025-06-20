import { shopify } from "config/shopify";
import { Request, Response } from "express";
import { UserDAO } from "dao/userDao"
import { RESPONSE_MESSAGES } from "constants/response";



const AuthController = {
    startOAuth: async (req: Request, res: Response) => {
        const shop = req.query.shop as string;
        if (!shop) {
            res.status(400).json({ message: "Missing shop parameter" });
            return
        }

        try {
            await shopify.auth.begin({
                shop,
                callbackPath: '/api/auth/callback',
                isOnline: false,
                rawRequest: req,
                rawResponse: res,
            });
            return
        } catch (error) {
            console.error("OAuth start error:", error);
            if (!res.headersSent) {
                res.status(500).json({ message: "Failed to start Shopify OAuth" });
            }
        }
    },

    handleCallback: async (req: Request, res: Response) => {
        try {
            const session = await shopify.auth.callback({
                rawRequest: req,
                rawResponse: res,
            });

            const shop = session.session.shop;
            const accessToken = session.session.accessToken;
            if (!shop || !accessToken) {
                res.status(400).json({ message: "Shop or access token missing from session" });
                return
            }
            // Store or update user
            await UserDAO.upsertShop({ shop, accessToken });

            // TODO: redirect to app dashboard (embedded or standalone)
            res.redirect(`https://${shop}/admin/apps`);
        } catch (error) {
            console.error("OAuth Error:", error);
            res.status(500).json(RESPONSE_MESSAGES.ERROR.INTERNAL_SERVER_ERROR);
        }
    },


}



export default AuthController;


