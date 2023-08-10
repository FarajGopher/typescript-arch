import Joi, { ObjectSchema } from 'joi';

export interface Userdto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface Logindto {
  email: string;
  password: string;
}
// Define the validation schema using Joi
export const userSchema: ObjectSchema<Userdto> = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8)
});

// Define the validation schema using Joi
export const userLoginSchema: ObjectSchema<Logindto> = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8)
});

