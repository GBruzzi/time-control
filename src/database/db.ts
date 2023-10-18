import dotenv from 'dotenv';
dotenv.config();

import pg from 'pg';

const { Client } = pg; 

const client = new Client({
  host: process.env.PGHOST,
  port: process.env.PGPORT ? parseInt(process.env.PGPORT, 10) : undefined,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

// await client.connect();

const connectDb = async () => {
  await client.connect()
}

connectDb()

console.log('Conexão ao banco de dados bem-sucedida');

export default client;