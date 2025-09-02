import mysql from "mysql2";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST, // uniquevishal.mysql.database.azure.com
  user: process.env.DB_USER, // vishal@uniquevishal
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  ssl: {
    ca: fs.readFileSync("./DigiCertGlobalRootG2.crt.pem"), // or Baltimore root cert
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

const promisePool = pool.promise();

const testConnection = async () => {
  try {
    await promisePool.query("SELECT 1");
    console.log("✅ Database connection successful.");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
};

export { promisePool, testConnection };
