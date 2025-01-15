import mongoose from "mongoose";

interface ConnectionOptions {
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabse {

    static async connect( options: ConnectionOptions ) {

        const { mongoUrl, dbName } = options;

        try {

            await mongoose.connect(mongoUrl, {
                dbName: dbName,
            });

            console.log('📦 Conexión a MongoDB establecida');

        } catch (error) {
            console.error('❌ Error de conexión a MongoDB:', error);
            throw error;
        }
    }
}