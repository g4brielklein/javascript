import postgres from "pg";
import "dotenv/config";

export const query = async (query) => {
  const client = new postgres.Client({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  });

  try {
    await client.connect();
    return await client.query(query);
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
};
