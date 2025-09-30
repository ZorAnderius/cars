import { register } from "../services/usersServices.js"

export const registeController = async (req, res, next) => {
  const data = await register(req.body);
  res.status(201).json({
    message: "User create successfully",
    data
  })
}