import * as dotenv from 'dotenv';
import { defineConfig } from '@mikro-orm/core';
dotenv.config();

export default defineConfig({
  type: 'postgresql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  entitiesTs: ['./src/modules/**/*.entity.ts'],
  entities: ['./dist/src/modules/**/*.entity.js'],
  migrations: {
    path: './migrations',
  },
  debug: true,
});
