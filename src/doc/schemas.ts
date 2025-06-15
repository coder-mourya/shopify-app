import Joi from "joi";
import { generateExampleFromJoi } from "../utils/swagger";
import { createBadgeValidation, updateBadge, updateStatus } from "../validations/badgeValidation";


function withExample(joiSchema: Joi.Schema): any {
    return generateExampleFromJoi(joiSchema);
  }

export const swaggerSchemas = {
  // badge
  createBadgeSchema: withExample(createBadgeValidation),
  updateBadgeSchema: withExample(updateBadge),
  updateBadgeStatusSchema: withExample(updateStatus),
 
};
