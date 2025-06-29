import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './src/db/drizzle/migration',
  schema: './src/db/drizzle/schemas.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: './db.sqlite3',
  },
});
