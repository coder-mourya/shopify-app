import { Router } from "express";
import { badgeController } from "../controller/index";
import { ValidateCreateBadge, ValidateUpdateBadge, ValidateupdateStatus } from "../validations/badgeValidation";



const router = Router();

router
    .post("/create-badge", ValidateCreateBadge, badgeController.createBadge
        /* #swagger.tags = ['Badge']
        #swagger.description = 'Create badge'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Create badge data',
            required: true,
            schema: {
                $ref: '#/definitions/createBadgeSchema'
            }
        }
        #swagger.responses[201] = {
            description: 'Badge created successfully',
            schema: {
                $ref: '#/definitions/createBadgeSchema'
            }
        }
        */

    )
    .get("/get-all-badges", badgeController.getAllBadges
        /* #swagger.tags = ['Badge']
        #swagger.description = 'Get all badges'
        #swagger.responses[200] = {
            description: 'Badges fetched successfully',
            
        }
        */
    )
    .patch("/update-badge/:id", ValidateUpdateBadge, badgeController.updateBadge
        /* #swagger.tags = ['Badge']
        
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Update badge data',
            required: true,
            schema: {
                $ref: '#/definitions/updateBadgeSchema'
            }
        }
        #swagger.responses[200] = {
            description: 'Badge updated successfully',
            
        }
        */
    )
    .patch("/update-badge-status/:id",ValidateupdateStatus,  badgeController.updateStatus
        /* #swagger.tags = ['Badge']
        
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Update badge status',
            required: true,
            schema: {
                $ref: '#/definitions/updateBadgeStatusSchema'
            }
        }
        #swagger.responses[200] = {
            description: 'Badge status updated successfully',
            
        }
        */
    )
    .delete("/delete-badge/:id", badgeController.deleteBadge
        /* #swagger.tags = ['Badge']
        #swagger.description = 'Delete badge'
        #swagger.responses[200] = {
            description: 'Badge deleted successfully',
            
        }
        */
    );



export default router;