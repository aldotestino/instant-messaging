import Joi from 'joi';

const messageSchema = Joi.object({
  content: Joi.string().required(),
  username: Joi.string().max(20).required(),
  date: Joi.string().isoDate().required(),
  photoUrl: Joi.string().uri().allow('')
});

export default messageSchema;