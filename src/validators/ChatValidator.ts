import Joi from "joi";

export const createChatValidator = Joi.object({
  chatName: Joi.string().required().messages({
    "any.required": "Chat Name is a required field",
    "string.": "Chat Name must be string",
  }),
  chatType: Joi.string().required().messages({
    "any.required": "Chat type is a required field",
    "string.": "Chat type must be string",
  }),
  chatMembersId: Joi.number().required().messages({
    "any.required": "Chat member is required",
  }),
});
