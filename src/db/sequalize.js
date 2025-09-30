import { Sequelize } from "sequelize";
import env from "../utils/env.js";

const sequelize = new Sequelize({
  dialect: env("DB_DIALECT"),
  username: env("DB_USER"),
  PORT: env("DB_PORT"),
  password: env("DB_PASSWORD"),
  database: env("DB_NAME"),
  host: env("DB_HOST"),
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    connectTimeout: 10000,
  },
  pool: {
    max: 5,
    min: 1,
    acquire: 30000,
    idle: 5000,
  },
  timezone: '+00:00',
  define: {
    timestamps: true,
    underscored: true,
  }
})

export default sequelize;