import Joi from 'joi';

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().max(20).required(),
  password: Joi.string().required().min(5).required(),
  photoUrl: Joi.string().uri().allow(''),
  confirmed: Joi.boolean().default(false)
});

export default userSchema;