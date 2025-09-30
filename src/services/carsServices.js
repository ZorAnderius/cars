import createHttpError from 'http-errors';
import Car from "../db/models/Cars.js";

export const createCar = async (carData) => {
  try {
    const newCar = await Car.create(carData);
    return newCar;
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      throw createHttpError(400, 'Validation error: ' + error.message);
    }
    throw createHttpError(500, 'Error creating car');
  }
};

export const getAllCars = async () => {
  try {
    const cars = await Car.findAll({
      order: [['created_at', 'DESC']]
    });
    return cars;
  } catch (error) {
    throw createHttpError(500, 'Error fetching cars');
  }
};

export const getCarById = async (id) => {
  try {
    const car = await Car.findByPk(id);
    if (!car) {
      throw createHttpError(404, 'Car not found');
    }
    return car;
  } catch (error) {
    if (error.status) throw error;
    throw createHttpError(500, 'Error fetching car');
  }
};

export const updateCar = async (id, carData) => {
  try {
    const car = await Car.findByPk(id);
    if (!car) {
      throw createHttpError(404, 'Car not found');
    }
    
    await car.update(carData);
    return car;
  } catch (error) {
    if (error.status) throw error;
    if (error.name === 'SequelizeValidationError') {
      throw createHttpError(400, 'Validation error: ' + error.message);
    }
    throw createHttpError(500, 'Error updating car');
  }
};

export const deleteCar = async (id) => {
  try {
    const car = await Car.findByPk(id);
    if (!car) {
      throw createHttpError(404, 'Car not found');
    }
    
    await car.destroy();
    return { message: 'Car deleted successfully' };
  } catch (error) {
    if (error.status) throw error;
    throw createHttpError(500, 'Error deleting car');
  }
};
