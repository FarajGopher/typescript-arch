
import { Sequelize, Op } from 'sequelize';
import { Userdto } from '../models/dto/auth.users.dto';
const db=require('../models/models/index.js')
const User=db.User;


export const UserExists = async (email: string): Promise<[Userdto | null, Error | null]> => {
    try {
      const userDetails = await User.findOne({
        where: {
          [Op.and]: [{ email: email }],
        },
      });
  
      return [userDetails, null];
    } catch (error) {
      return [null, error];
    }
  };


  export const UserCreate = async (user: Userdto): Promise<[Userdto | null, Error | null]> => {
    try {
      const userDetails = await User.create(user);
  
      return [userDetails, null];
    } catch (error) {
      return [null, error];
    }
  };

  export const UserDelete = async (email: string): Promise<[Userdto | null, Error | null]> => {
    try {
      const userDetails = await  User.destroy({
        where: {
          email: email
        },
      });
  
      return [userDetails, null];
    } catch (error) {
      return [null, error];
    }
  };

export default { UserExists,UserCreate,UserDelete };