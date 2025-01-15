import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { UserRepository } from '../repositories/user.repository';
import { validateSchema } from '../middleware/validateSchema.middleware';
import { createUserSchema, updateUserSchema } from '../schemas/user.schemas';

const router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// Rutas
router.post('/',
    validateSchema(createUserSchema),
    userController.createUser);

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.put('/:id',
    validateSchema(updateUserSchema),
    userController.updateUser);

router.delete('/:id', userController.deleteUser);

export default router;
