import { register, login } from "../services/usersServices.js"
import { createSession, deleteSession } from "../services/sessionServices.js"

export const registeController = async (req, res, next) => {
  const data = await register(req.body);
  res.status(201).json({
    message: "User create successfully",
    data
  })
}

export const loginController = async (req, res, next) => {
  const userData = await login(req.body);
  
  // Створюємо сесію в базі даних
  const session = await createSession(userData.id, {
    email: userData.email,
    role: userData.role
  });
  
  // Зберігаємо дані в express session (sessionId залишається внутрішнім)
  req.session.sessionId = session.sessionId;
  req.session.userId = userData.id;
  req.session.userEmail = userData.email;
  req.session.userRole = userData.role;
  
  res.status(200).json({
    message: "Login successful",
    user: {
      id: userData.id,
      email: userData.email,
      role: userData.role
    }
  });
}

export const logoutController = async (req, res, next) => {
  if (req.session.sessionId) {
    await deleteSession(req.session.sessionId);
  }
  
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Error during logout" });
    }
    res.status(200).json({ message: "Logged out successfully" });
  });
}

export const getCurrentUserController = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  
  res.status(200).json({
    user: {
      id: req.session.userId,
      email: req.session.userEmail,
      role: req.session.userRole
    }
  });
}