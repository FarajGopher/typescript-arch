import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Joi from 'joi';
import userSchema from '../models/dto/auth.users.dto';

const signupController = async (req: Request, res: Response) => {
  // Create uuid
  const ID = uuidv4();

  // Check validation in request
  const validationResult = userSchema.validate(req.body);
  if (validationResult.error) {
    res.status(400).send(validationResult.error.details[0].message);
    return;
  }

  // Handle your user registration logic here...

  res.status(200).send({
    message: 'user created successfully',
  });
};

export default signupController;