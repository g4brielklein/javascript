const { Client } = require('pg');
require('dotenv').config();

async function query(query) {
    const client = new Client({
        host: '',
        port: '',
        database: '',
        user: '',
        password: '',
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
