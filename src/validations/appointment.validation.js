const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createAppointment = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    contactNumber: Joi.string().required(),
    email: Joi.string().email().required(),
    serviceCategory: Joi.string().custom(objectId).required(),
    serviceType: Joi.string().custom(objectId).required(),
    additionalNotes: Joi.string().allow('').optional(),
    appointmentDateTime: Joi.date().required(),
    status: Joi.string().valid('Upcoming', 'Past', 'Cancelled').default('Upcoming'),
  }),
};

const updateAppointment = {
  params: Joi.object().keys({
    appointmentId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      contactNumber: Joi.string(),
      email: Joi.string().email(),
      preferredHairdresser: Joi.string().custom(objectId),
      serviceCategory: Joi.string().custom(objectId),
      serviceType: Joi.string().custom(objectId),
      additionalNotes: Joi.string().allow(''),
      userId: Joi.string().custom(objectId),
      appointmentDateTime: Joi.date(),
      status: Joi.string().valid('Upcoming', 'Past', 'Cancelled'),
    })
    .min(1),
};

const deleteAppointment = {
  params: Joi.object().keys({
    appointmentId: Joi.string().custom(objectId),
  }),
};

const getAppointments = {
  query: Joi.object().keys({
    preferredHairdresser: Joi.string().custom(objectId),
    serviceCategory: Joi.string().custom(objectId),
    serviceType: Joi.string().custom(objectId),
    userId: Joi.string().custom(objectId),
    status: Joi.string().valid('Upcoming', 'Past', 'Cancelled'),
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1),
  }),
};

module.exports = {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointments,
};
