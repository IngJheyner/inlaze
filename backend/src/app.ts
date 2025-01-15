import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/environment';
import { MongoDatabse } from "./config/database";
import { errorMiddleware } from './middleware/error.middleware';
import userRoutes from './routes/user.routes';
import taskRoutes from './routes/task.routes';

export class App {

    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.initializeErrorHandling();
        this.mongoSetup();
    }

    private config(): void {
        // Middlewares
        this.app.use(cors());
        this.app.use(helmet());

        // Configuración de Express para manejar JSON y URL-encoded
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private routes(): void {
        // Ruta de prueba
        this.app.get('/', (req: Request, res: Response) => {
            res.send('¡API funcionando correctamente! 👋');
        });

        // Rutas de usuarios
        this.app.use('/users', userRoutes);

        // Rutas de tareas
        this.app.use('/tasks', taskRoutes);
    }

    private initializeErrorHandling(): void {
        this.app.use(errorMiddleware);
    }

    private async mongoSetup(): Promise<void> {

        await MongoDatabse.connect({
            mongoUrl: config.databaseURL,
            dbName: config.mongoDbName,
        });
        //console.log("db",config.databaseURL);
    }

    public async main(): Promise<void> {
        this.app.listen(config.port, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${config.port}`);
            console.log(`🌍 Ambiente: ${config.env}`);
        });
    }
}
