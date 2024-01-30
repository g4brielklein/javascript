import { query } from "./database.js";

const alterTable = async () => {
  await query("ALTER TABLE books ALTER COLUMN id TYPE varchar;");

  return;
};

const createTable = async () => {
  await query(
    `
            CREATE TABLE IF NOT EXISTS books (
                id varchar PRIMARY KEY,
                name varchar,
                author varchar
            );
        `,
  );

  return console.log("Table created");
};

createTable();
