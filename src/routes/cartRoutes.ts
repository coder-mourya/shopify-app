import { Router } from "express";
import { cartController } from "controller/index";
import { ValidateCreateCart, ValidateUpdateStatus } from "validations/cartValidation";

const router = Router();

router
    .post("/create-cart", cartController.createCart, ValidateCreateCart
        /* #swagger.tags = ['Cart']
        #swagger.description = 'Create cart'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Create cart data',
            required: true,
            schema: {
                $ref: '#/definitions/createCartSchema'
            }
        }
        #swagger.responses[201] = {
            description: 'Cart created successfully',
            schema: {
                $ref: '#/definitions/createCartSchema'
            }
        }
        */
    )
    .get("/get-all-carts", cartController.getAllCarts
        /* #swagger.tags = ['Cart']
        #swagger.description = 'Get all carts'
        #swagger.responses[200] = {
            description: 'Carts fetched successfully',
            
        }
        */
    )
    .patch("/update-cart-status/:id", ValidateUpdateStatus, cartController.updateCartStatus
        /* #swagger.tags = ['Cart']
        #swagger.description = 'Update cart status'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Update cart status',
            required: true,
            schema: {
                $ref: '#/definitions/updateCartStatusSchema'
            }
        }
        #swagger.responses[200] = {
            description: 'Cart status updated successfully',
            
        }
        */
    )
    .patch('/update-cart/:id', cartController.updateCart
        /* #swagger.tags = ['Cart']
        #swagger.description = 'Update cart'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Update cart data',
            required: true,
            schema: {
                $ref: '#/definitions/updateCartSchema'
            }
        }
        #swagger.responses[200] = {
            description: 'Cart updated successfully',
            
        }
        */
    );


export default router;        