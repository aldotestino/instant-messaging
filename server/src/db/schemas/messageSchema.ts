import Joi from 'joi';

const messageSchema = Joi.object({
  content: Joi.string().required(),
  username: Joi.string().max(20).required(),
  user_id: Joi.string().required()
});

export default messageSchema;