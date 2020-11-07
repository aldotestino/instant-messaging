import Joi from 'joi';

const messageSchema = Joi.object({
  content: Joi.string().required(),
  date: Joi.string().isoDate().required(),
  user_id: Joi.string().required()
});

export default messageSchema;