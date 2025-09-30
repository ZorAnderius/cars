import Session from "../db/models/Session.js";
import { v4 as uuidv4 } from 'uuid';

export const createSession = async (userId, sessionData = {}) => {
  const sessionId = uuidv4();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  
  const session = await Session.create({
    sessionId,
    userId,
    data: sessionData,
    expiresAt
  });
  
  return session;
};

export const getSession = async (sessionId) => {
  const session = await Session.findOne({
    where: { 
      sessionId,
      expiresAt: {
        [require('sequelize').Op.gt]: new Date()
      }
    }
  });
  
  return session;
};

export const updateSession = async (sessionId, sessionData) => {
  const session = await Session.findOne({ where: { sessionId } });
  if (session) {
    session.data = sessionData;
    await session.save();
  }
  return session;
};

export const deleteSession = async (sessionId) => {
  await Session.destroy({ where: { sessionId } });
};

export const deleteUserSessions = async (userId) => {
  await Session.destroy({ where: { userId } });
};

export const cleanupExpiredSessions = async () => {
  await Session.destroy({
    where: {
      expiresAt: {
        [require('sequelize').Op.lt]: new Date()
      }
    }
  });
};
