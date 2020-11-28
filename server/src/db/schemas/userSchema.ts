import Joi from 'joi';

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().trim().min(2).max(20).required(),
  password: Joi.string().trim().required().min(5).required(),
  photoUrl: Joi.string().uri().allow(''),
  confirmed: Joi.boolean().default(false)
});

export default userSchema;