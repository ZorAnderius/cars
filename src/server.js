import app from "./app.js";
import sequelize from "./db/sequalize.js";
import env from "./utils/env.js";

const PORT = env("PORT", 3000);

const setupServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('\x1b[32mDatabase connected successfully!\x1b[0m');
    app.listen(PORT, () => {
      console.log(`\x1b[35mServer is running on the port ${PORT}\x1b[0m`);
    })
  } catch (error) {
    throw new Error(error);
  }
}

export default setupServer;