import Joi from "joi";

// Define the schema for creating a user
export const createUserSchema = Joi.object({
  name: Joi.string().min(1).required().messages({
    "string.base": "Name should be a type of text",
    "string.empty": "Name cannot be empty",
    "any.required": "Name is a required field",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email should be a type of text",
    "string.email": "Email must be a valid email address",
    "any.required": "Email is a required field",
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": "Password should be a type of text",
    "string.min": "Password should be at least 6 characters long",
    "any.required": "Password is a required field",
  }),
});
