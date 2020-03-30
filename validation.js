const Joi = require("@hapi/joi");

//Registration Validation
const registerValidation = data => {
  const schema = Joi.object({
    username: Joi.string()
      .min(3)
      .max(255)
      .required(),
    password: Joi.string()
      .min(8)
      .max(1024)
      .required()
  });
  return schema.validate(data);
};

//Login Validation
const loginValidation = data => {
  const schema = Joi.object({
    username: Joi.string()
      .min(3)
      .max(255)
      .required(),
    password: Joi.string()
      .min(8)
      .max(1024)
      .required(),
    rememberMe: Joi.boolean().required()
  });
  return schema.validate(data);
};

//Message Validation
const messageValidation = data => {
  // const schema = Joi.object({
  //   message: Joi.string()
  //     .min(1)
  //     .max(65536)
  //     .required(),
  //   to: Joi.string()
  //     .min(3)
  //     .max(255)
  //     .required()
  // });
  const schema = Joi.object({
    message: Joi.string()
      .min(1)
      .max(65536)
      .required()
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.messageValidation = messageValidation;
