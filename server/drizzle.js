import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";


const { DB_NAME, DB_USER, DB_PASS } = process.env;

const connection = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: DB_USER,
    database: DB_NAME,
    password: DB_PASS,
});

export const db = drizzle({ client: connection });
