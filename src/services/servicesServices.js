import createHttpError from 'http-errors';
import Service from "../db/models/Services.js";

export const createService = async (serviceData) => {
  try {
    const newService = await Service.create(serviceData);
    return newService;
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      throw createHttpError(400, 'Validation error: ' + error.message);
    }
    throw createHttpError(500, 'Error creating service');
  }
};

export const getAllServices = async () => {
  try {
    const services = await Service.findAll({
      order: [['created_at', 'DESC']]
    });
    return services;
  } catch (error) {
    throw createHttpError(500, 'Error fetching services');
  }
};

export const getServiceById = async (id) => {
  try {
    const service = await Service.findByPk(id);
    if (!service) {
      throw createHttpError(404, 'Service not found');
    }
    return service;
  } catch (error) {
    if (error.status) throw error;
    throw createHttpError(500, 'Error fetching service');
  }
};

export const updateService = async (id, serviceData) => {
  try {
    const service = await Service.findByPk(id);
    if (!service) {
      throw createHttpError(404, 'Service not found');
    }
    
    await service.update(serviceData);
    return service;
  } catch (error) {
    if (error.status) throw error;
    if (error.name === 'SequelizeValidationError') {
      throw createHttpError(400, 'Validation error: ' + error.message);
    }
    throw createHttpError(500, 'Error updating service');
  }
};

export const deleteService = async (id) => {
  try {
    const service = await Service.findByPk(id);
    if (!service) {
      throw createHttpError(404, 'Service not found');
    }
    
    await service.destroy();
    return { message: 'Service deleted successfully' };
  } catch (error) {
    if (error.status) throw error;
    throw createHttpError(500, 'Error deleting service');
  }
};

