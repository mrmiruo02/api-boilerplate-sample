import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const config = {
  port: process.env.PORT,
};

const connection = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
  port: process.env.PORT as number | undefined,
});

export const dbConfig = { connection, config };
