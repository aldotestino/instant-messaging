import Joi from 'joi';

const messageSchema = Joi.object({
  content: Joi.string().trim().required(),
  user_id: Joi.string().required()
});

export default messageSchema;