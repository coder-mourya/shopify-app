import Joi from "joi";
import { generateExampleFromJoi } from "utils/swagger";
import { createBadgeValidation, updateBadge, updateStatus } from "validations/badgeValidation";
import { createBannerValidation, updateBanner, updateBannerStatus } from "validations/bannerValidation";
import { createCartValidation, updateCart, updateCartStatus } from "validations/cartValidation";
import { createTimerValidation, updateTimer, updateTimerStatus } from "validations/timeValidation";



function withExample(joiSchema: Joi.Schema): any {
    return generateExampleFromJoi(joiSchema);
  }

export const swaggerSchemas = {
  // badge
  createBadgeSchema: withExample(createBadgeValidation),
  updateBadgeSchema: withExample(updateBadge),
  updateBadgeStatusSchema: withExample(updateStatus),
  // banner 
  createBannerSchema: withExample(createBannerValidation),
  updateBannerSchema: withExample(updateBanner),
  updateBannerStatusSchema: withExample(updateBannerStatus),
  // cart
  createCartSchema: withExample(createCartValidation),
  updateCartSchema: withExample(updateCart),
  updateCartStatusSchema: withExample(updateCartStatus),
  // timer 
  createTimerSchema: withExample(createTimerValidation),
  updateTimerSchema: withExample(updateTimer),
  updateTimerStatusSchema: withExample(updateTimerStatus),
 
};
