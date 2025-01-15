import * as dotenv from 'dotenv';
import * as path from 'path';
import * as env from 'env-var';

// Configura la ruta al archivo .env en la raíz del proyecto
dotenv.config({ path: path.join(__dirname, '../../../.env') });

export const config = {
    port: process.env.PORT || 3000,
    databaseURL: env.get('MONGO_URL').required().asString(),
    mongoDbName: env.get('MONGO_DB_NAME').required().asString(),
    env: process.env.NODE_ENV || 'development',
};
