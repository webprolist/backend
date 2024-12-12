import { Pool } from "pg";
const dbConnectingString = process.env.DB;

const pool = new Pool({
  connectionString: dbConnectingString,
  ssl: {
    rejectUnauthorized: false,
    ca: process.env.PEM_DB
  }
});

const db = drizzle(pool);
