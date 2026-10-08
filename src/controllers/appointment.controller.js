const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');

const { appointmentService } = require('../services');

const createAppointment = catchAsync(async (req, res) => {
  const appointment = await appointmentService.createAppointment(req.body);

  res.status(httpStatus.CREATED).send(appointment);
});

const getAppointments = catchAsync(async (req, res) => {
  // Extract the pagination and other query parameters manually
  const filter = {
    serviceCategory: req.query.serviceCategory,
    serviceType: req.query.serviceType,
    status: req.query.status,
  };

  // Remove undefined values from the filter object
  Object.keys(filter).forEach((key) => {
    if (filter[key] === undefined) {
      delete filter[key];
    }
  });

  // Extract pagination options and remove them from the filter
  const options = {
    sortBy: req.query.sortBy,
    populate: req.query.populate,
    page: parseInt(req.query.page, 10) || 1,
    limit: parseInt(req.query.limit, 10) || 10,
  };

  // Call the service method with the extracted filter and options
  const result = await appointmentService.queryAppointments(filter, options);

  // Send the result back to the client
  res.send(result);
});

const getAppointment = catchAsync(async (req, res) => {
  const appointment = await appointmentService.getAppointmentById(req.params.appointmentId);
  if (!appointment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Appointment not found');
  }
  res.send(appointment);
});

const updateAppointment = catchAsync(async (req, res) => {
  const appointment = await appointmentService.updateAppointmentById(req.params.appointmentId, req.body);

  res.send(appointment);
});

const deleteAppointment = catchAsync(async (req, res) => {
  await appointmentService.deleteAppointmentById(req.params.appointmentId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createAppointment,
  getAppointments,
  getAppointment,
  updateAppointment,
  deleteAppointment,
};
