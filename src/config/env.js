const requiredEnv = ['MONGODB_URI', 'JWT_SECRET'];

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`${key} is required in environment`);
  }
});

if (!process.env.ALLOWED_ORIGINS) {
  process.env.ALLOWED_ORIGINS = 'http://localhost:3000';
}

module.exports = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  allowedOrigins: process.env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean),
  openAiApiKey: process.env.OPENAI_API_KEY || '',
};
