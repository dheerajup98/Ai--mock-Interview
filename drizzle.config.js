/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: "postgresql://neondb_owner:VG4ZYnJm1hgX@ep-floral-tooth-a5ataohe.us-east-2.aws.neon.tech/ai-take-interview?sslmode=require",
    }
  };