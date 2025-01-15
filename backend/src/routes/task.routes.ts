import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { TaskService } from '../services/task.service';
import { TaskRepository } from '../repositories/task.repository';
import { validateSchema } from '../middleware/validateSchema.middleware';
import { taskCreateSchema, taskUpdateSchema } from '../schemas/task.schemas';

const router = Router();

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

// Rutas
router.post('/',
    validateSchema(taskCreateSchema),
    taskController.createTask);

router.get('/', taskController.getAllTasks);

router.put('/:id',
    validateSchema(taskUpdateSchema),
    taskController.updateTask);

router.delete('/:id', taskController.deleteTask);

// Tareas por usuario
router.get('/:userId/user', taskController.getTaskByUserId);

export default router;
