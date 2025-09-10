import { config } from 'dotenv';

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';

config({ path: envFile });

// Export individual variables
export const {
    JWT_ACCESS_SECRET,
    JWT_ACCESS_EXPIRES_IN
} = process.env;
