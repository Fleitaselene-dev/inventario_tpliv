import { Router } from 'express';
import { body } from 'express-validator';
import { AuthController } from '../controllers/auth.controller';
import { authenticateToken} from '../middlewares/auth.middlewares';
import { handleValidationErrors } from '../middlewares/validate.middleware';
const router = Router();
const authController = new AuthController();

//  Validaciones para registro
const registerValidation = [
  body('name')
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
  body('email')
    .isEmail()
    .withMessage('Debe ser un email válido'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres')
];

// Validaciones para el primer usuario 
const firstUserValidation = [
  body('name')
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
  body('email')
    .isEmail()
    .withMessage('Debe ser un email válido'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres')
];

// Validaciones para login
const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Debe ser un email válido'),
  body('password')
    .notEmpty()
    .withMessage('La contraseña es requerida')
];

// Rutas públicas
router.post('/register', registerValidation, handleValidationErrors, authController.register);
router.post('/login', loginValidation, handleValidationErrors, authController.login);

// Ruta para crear el primer usuario administrador si no hay usuarios
router.post(
  '/first-user', 
  firstUserValidation, 
  handleValidationErrors, 
  AuthController.allowFirstUser,
  authController.register
);

// Rutas protegidas
router.get('/profile', authenticateToken, authController.getProfile);

export default router;