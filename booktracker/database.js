const { Client } = require('pg');
require('dotenv').config();

async function query(query) {
    const client = new Client({
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
}

module.exports = { query };
