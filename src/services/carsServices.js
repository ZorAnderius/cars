import createHttpError from 'http-errors';
import Car from "../db/models/Cars.js";
import { Op } from 'sequelize';

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

export const getAllCars = async (filters = {}) => {
  try {
    const { year, model, priceMin, priceMax, bodyStyle } = filters;
    
    // Будую умови для фільтрації
    const whereConditions = {};
    
    // Фільтр за роком
    if (year) {
      whereConditions.year = year;
    }
    
    // Фільтр за моделлю (частинний пошук)
    if (model) {
      whereConditions.model = {
        [Op.iLike]: `%${model}%`
      };
    }
    
    // Фільтр за ціною (діапазон)
    if (priceMin || priceMax) {
      whereConditions.price = {};
      if (priceMin) whereConditions.price[Op.gte] = parseFloat(priceMin);
      if (priceMax) whereConditions.price[Op.lte] = parseFloat(priceMax);
    }
    
    // Фільтр за типом кузова
    if (bodyStyle) {
      whereConditions.bodyStyle = {
        [Op.iLike]: `%${bodyStyle}%`
      };
    }
    
    const cars = await Car.findAll({
      where: whereConditions,
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
