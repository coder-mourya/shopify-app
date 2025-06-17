import { Router } from "express";
import { bannerController } from "controller/index";
import { ValidateCreateBanner, ValidateUpdateBanner, ValidateUpdateStatus } from "validations/bannerValidation";

const router = Router();

router
    .post("/create-banner", ValidateCreateBanner, bannerController.createBanner
        /* #swagger.tags = ['Banner']
        #swagger.description = 'Create banner'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Create banner data',
            required: true,
            schema: {
                $ref: '#/definitions/createBannerSchema'
            }
        }
        #swagger.responses[201] = {
            description: 'Banner created successfully',
            schema: {
                $ref: '#/definitions/createBannerSchema'
            }
        }
        */
    )
    .get("/get-all-banners", bannerController.getAllBanners
        /* #swagger.tags = ['Banner']
        #swagger.description = 'Get all banners'
        #swagger.responses[200] = {
            description: 'Banners fetched successfully',
            
        }
        */
    )
    .patch("/update-banner/:id", ValidateUpdateBanner, bannerController.updateBanner
        /* #swagger.tags = ['Banner']
        #swagger.description = 'Update banner'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Update banner data',
            required: true,
            schema: {
                $ref: '#/definitions/updateBannerSchema'
            }
        }
        #swagger.responses[200] = {
            description: 'Banner updated successfully',
            
        }
        */
    )
    .patch("/update-banner-status/:id", ValidateUpdateStatus, bannerController.updateStatus
        /* #swagger.tags = ['Banner']
        #swagger.description = 'Update banner status'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Update banner status',
            required: true,
            schema: {
                $ref: '#/definitions/updateBannerStatusSchema'
            }
        }
        #swagger.responses[200] = {
            description: 'Banner status updated successfully',
            
        }
        */
    )
    .delete("/delete-banner/:id", bannerController.deleteBanner
        /* #swagger.tags = ['Banner']
        #swagger.description = 'Delete banner'
        #swagger.responses[200] = {
            description: 'Banner deleted successfully',
            
        }
        */
    );

export default router;