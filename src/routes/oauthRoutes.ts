// userRoutes.ts
import { Router } from "express";
import {AuthController} from "controller/index";



const router = Router();

router
    .get('/auth', AuthController.startOAuth)
    .get('/auth/callback', AuthController.handleCallback)


export default router;