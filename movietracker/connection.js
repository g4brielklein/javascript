import 'dotenv/config';
import postgres from 'pg';

export const query = async (query) => {
    const client = new postgres.Client({
        host: process.env.PGHOST,
        port: process.env.PGPORT,
        database: process.env.PGDATABASE,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        ssl: true,
    });

    await client.connect();

    try {
        return await client.query(query);
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}
