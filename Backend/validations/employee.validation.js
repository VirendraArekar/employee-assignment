const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createEmployee = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    position: Joi.string().required(),
    salary: Joi.number().required(),
    hireDate: Joi.date().required(),
  }),
};

const getEmployee = {
  query: Joi.object().keys({
    search: Joi.string(),
    page : Joi.number(),
    perPage : Joi.number()
  }),
};

const getEmployeeById = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

const updateEmployee = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string().email(),
        position: Joi.string(),
        salary: Joi.number(),
        hireDate: Joi.date(),
    })
    .min(1),
};

const deleteEmployee = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createEmployee,
  getEmployeeById,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};