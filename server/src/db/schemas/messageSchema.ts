import Joi from 'joi';

const messageSchema = Joi.object({
  content: Joi.string().required(),
  user_id: Joi.string().required()
});

export default messageSchema;