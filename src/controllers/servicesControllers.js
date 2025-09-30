import { 
  createService, 
  getAllServices, 
  getServiceById, 
  updateService, 
  deleteService 
} from "../services/servicesServices.js";

export const createServiceController = async (req, res, next) => {
  const serviceData = await createService(req.body);
  res.status(201).json({
    message: "Service created successfully",
    service: serviceData
  });
};

export const getAllServicesController = async (req, res, next) => {
  const services = await getAllServices();
  res.status(200).json({
    message: "Services retrieved successfully",
    services
  });
};

export const getServiceByIdController = async (req, res, next) => {
  const { id } = req.params;
  const service = await getServiceById(id);
  res.status(200).json({
    message: "Service retrieved successfully",
    service
  });
};

export const updateServiceController = async (req, res, next) => {
  const { id } = req.params;
  const service = await updateService(id, req.body);
  res.status(200).json({
    message: "Service updated successfully",
    service
  });
};

export const deleteServiceController = async (req, res, next) => {
  const { id } = req.params;
  const result = await deleteService(id);
  res.status(200).json(result);
};

