/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./configs/Schema.jsx",
    dialect: 'postgresql',
    dbCredentials: {
      url:"postgresql://neondb_owner:npg_MNlxuciR51ZS@ep-round-star-a8saecy2.eastus2.azure.neon.tech/AI-Course-Generator?sslmode=require",
      
    }
  };