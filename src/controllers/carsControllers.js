import { createCar, getAllCars, getCarById, updateCar, deleteCar } from "../services/carsServices.js";

export const createCarController = async (req, res, next) => {
  let carData = { ...req.body };
  
  // Якщо є завантажене фото, завантажуємо його на Cloudinary
  if (req.file) {
    try {
      const { default: saveToCloudinary } = await import("../utils/cloudinary.js");
      const photoUrl = await saveToCloudinary(req.file, "cars");
      carData.photo = photoUrl;
    } catch (error) {
      return res.status(500).json({
        message: "Error uploading photo",
        error: error.message
      });
    }
  }
  
  const newCar = await createCar(carData);
  res.status(201).json({
    message: "Car created successfully",
    car: newCar
  });
};

export const getAllCarsController = async (req, res, next) => {
  const cars = await getAllCars();
  res.status(200).json({
    message: "Cars retrieved successfully",
    cars
  });
};

export const getCarByIdController = async (req, res, next) => {
  const { id } = req.params;
  const car = await getCarById(id);
  res.status(200).json({
    message: "Car retrieved successfully",
    car
  });
};

export const updateCarController = async (req, res, next) => {
  const { id } = req.params;
  let carData = { ...req.body };
  
  // Якщо є завантажене фото, завантажуємо його на Cloudinary
  if (req.file) {
    try {
      const { default: saveToCloudinary } = await import("../utils/cloudinary.js");
      const photoUrl = await saveToCloudinary(req.file, "cars");
      carData.photo = photoUrl;
    } catch (error) {
      return res.status(500).json({
        message: "Error uploading photo",
        error: error.message
      });
    }
  }
  
  const car = await updateCar(id, carData);
  res.status(200).json({
    message: "Car updated successfully",
    car
  });
};

export const deleteCarController = async (req, res, next) => {
  const { id } = req.params;
  const result = await deleteCar(id);
  res.status(200).json(result);
};
