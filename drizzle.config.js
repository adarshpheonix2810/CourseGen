import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./configs/schema.jsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: process.env.NEXT_PUBLIC_DB_CONNECTION_STRING
    }
  };