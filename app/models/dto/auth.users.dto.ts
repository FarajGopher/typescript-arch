import Joi, { ObjectSchema } from 'joi';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Define the validation schema using Joi
const userSchema: ObjectSchema<User> = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8)
});

export default userSchema;
