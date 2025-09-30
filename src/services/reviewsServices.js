import createHttpError from 'http-errors';
import Review from "../db/models/Reviews.js";
import Car from "../db/models/Cars.js";

export const createReview = async (reviewData) => {
  try {
    // Перевіряємо чи існує автомобіль
    const car = await Car.findByPk(reviewData.car_id);
    if (!car) {
      throw createHttpError(404, 'Car not found');
    }
    
    const newReview = await Review.create(reviewData);
    return newReview;
  } catch (error) {
    if (error.status) throw error;
    if (error.name === 'SequelizeValidationError') {
      throw createHttpError(400, 'Validation error: ' + error.message);
    }
    throw createHttpError(500, 'Error creating review');
  }
};

export const getAllReviews = async () => {
  try {
    const reviews = await Review.findAll({
      include: [{
        model: Car,
        as: 'Car',
        attributes: ['id', 'model', 'year']
      }],
      order: [['created_at', 'DESC']]
    });
    return reviews;
  } catch (error) {
    throw createHttpError(500, 'Error fetching reviews');
  }
};

export const getReviewsByCarId = async (carId) => {
  try {
    const reviews = await Review.findAll({
      where: { car_id: carId },
      include: [{
        model: Car,
        as: 'Car',
        attributes: ['id', 'model', 'year']
      }],
      order: [['created_at', 'DESC']]
    });
    return reviews;
  } catch (error) {
    throw createHttpError(500, 'Error fetching reviews for car');
  }
};

export const getReviewById = async (id) => {
  try {
    const review = await Review.findByPk(id, {
      include: [{
        model: Car,
        as: 'Car',
        attributes: ['id', 'model', 'year']
      }]
    });
    if (!review) {
      throw createHttpError(404, 'Review not found');
    }
    return review;
  } catch (error) {
    if (error.status) throw error;
    throw createHttpError(500, 'Error fetching review');
  }
};

export const updateReview = async (id, reviewData) => {
  try {
    const review = await Review.findByPk(id);
    if (!review) {
      throw createHttpError(404, 'Review not found');
    }
    
    await review.update(reviewData);
    return review;
  } catch (error) {
    if (error.status) throw error;
    if (error.name === 'SequelizeValidationError') {
      throw createHttpError(400, 'Validation error: ' + error.message);
    }
    throw createHttpError(500, 'Error updating review');
  }
};

export const deleteReview = async (id) => {
  try {
    const review = await Review.findByPk(id);
    if (!review) {
      throw createHttpError(404, 'Review not found');
    }
    
    await review.destroy();
    return { message: 'Review deleted successfully' };
  } catch (error) {
    if (error.status) throw error;
    throw createHttpError(500, 'Error deleting review');
  }
};
