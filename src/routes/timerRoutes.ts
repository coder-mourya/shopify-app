import { Router } from "express";
import { timerController } from "controller/index";
import { ValidateCreateTimer, ValidateUpdateStatus } from "validations/timeValidation";

const router = Router();

router
    .post("/create-timer", ValidateCreateTimer, timerController.createTimer
        /* #swagger.tags = ['Timer']
        #swagger.description = 'Create timer'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Create timer data',
            required: true,
            schema: {
                $ref: '#/definitions/createTimerSchema'
            }
        }
        #swagger.responses[201] = {
            description: 'Timer created successfully',
            schema: {
                $ref: '#/definitions/createTimerSchema'
            }
        }
        */
    )
    .get("/get-all-timers", timerController.getTimer
        /* #swagger.tags = ['Timer']
        #swagger.description = 'Get all timers'
        #swagger.responses[200] = {
            description: 'Timers fetched successfully',
            
        }
        */
    )
    .patch("/update-timer/:id", timerController.updateTimer
        /* #swagger.tags = ['Timer']
        #swagger.description = 'Update timer'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Update timer data',
            required: true,
            schema: {
                $ref: '#/definitions/updateTimerSchema'
            }
        }
        #swagger.responses[200] = {
            description: 'Timer updated successfully',
            
        }
        */
    )
    .patch("/update-timer-status/:id", ValidateUpdateStatus, timerController.updateStatus
        /* #swagger.tags = ['Timer']
        #swagger.description = 'Update timer status'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Update timer status',
            required: true,
            schema: {
                $ref: '#/definitions/updateTimerStatusSchema'
            }
        }
        #swagger.responses[200] = {
            description: 'Timer status updated successfully',
            
        }
        */
    )
    .delete("/delete-timer/:id", timerController.deleteTimer
        /* #swagger.tags = ['Timer']
        #swagger.description = 'Delete timer'
        #swagger.responses[200] = {
            description: 'Timer deleted successfully',
            
        }
        */
    );

export default router;