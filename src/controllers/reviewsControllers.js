import { 
  createReview, 
  getAllReviews, 
  getReviewsByCarId, 
  getReviewById, 
  updateReview, 
  deleteReview 
} from "../services/reviewsServices.js";

export const createReviewController = async (req, res, next) => {
  const reviewData = await createReview(req.body);
  res.status(201).json({
    message: "Review created successfully",
    review: reviewData
  });
};

export const getAllReviewsController = async (req, res, next) => {
  const reviews = await getAllReviews();
  res.status(200).json({
    message: "Reviews retrieved successfully",
    reviews
  });
};

export const getReviewsByCarIdController = async (req, res, next) => {
  const { id } = req.params; // Тепер параметр називається 'id' замість 'carId'
  const reviews = await getReviewsByCarId(id);
  res.status(200).json({
    message: "Reviews for car retrieved successfully",
    reviews
  });
};

export const getReviewByIdController = async (req, res, next) => {
  const { id } = req.params;
  const review = await getReviewById(id);
  res.status(200).json({
    message: "Review retrieved successfully",
    review
  });
};

export const updateReviewController = async (req, res, next) => {
  const { id } = req.params;
  const review = await updateReview(id, req.body);
  res.status(200).json({
    message: "Review updated successfully",
    review
  });
};

export const deleteReviewController = async (req, res, next) => {
  const { id } = req.params;
  const result = await deleteReview(id);
  res.status(200).json(result);
};
