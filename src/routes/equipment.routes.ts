import { Router } from 'express';
import { body, param } from 'express-validator';
import { EquipmentController } from '../controllers/equiment.controllers';
import { authenticateToken, requireAdmin } from '../middlewares/auth.middlewares';
import { handleValidationErrors } from '../middlewares/validate.middleware';

const router = Router();
const equipmentController = new EquipmentController();

//  Validación para ID de equipo
const idValidation = [
  param('id')
    .isMongoId()
    .withMessage('ID inválido')
];

const createEquipmentValidation = [
  body('name')
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
  body('type')
    .isIn(['laptop', 'desktop', 'monitor', 'printer', 'server', 'other'])
    .withMessage('Tipo de equipo inválido'),
  body('brand')
    .isLength({ min: 1 })
    .withMessage('La marca debe tener entre 1 y 50 caracteres'),
  body('EquipmentModel')
    .isLength({ min: 1 })
    .withMessage('El modelo debe tener entre 1 y 50 caracteres'),
  body('serialNumber')
    .isLength({ min: 1 })
    .withMessage('El número de serie es requerido'),
  body('status')
    .isIn(['available', 'in_use', 'maintenance', 'retired'])
    .withMessage('Estado inválido'),
];

//  Middleware para autenticar token JWT
router.use(authenticateToken);

//  Rutas accesibles para todos los usuarios autenticados
router.get('/', equipmentController.getAllEquipment);
router.get('/my-equipment', equipmentController.getMyEquipment);
router.get('/:id', idValidation, handleValidationErrors, equipmentController.getEquipmentById);

// Rutas protegidas solo para administradores
router.post('/', requireAdmin, createEquipmentValidation, handleValidationErrors, equipmentController.createEquipment);
router.put('/:id', requireAdmin, idValidation, handleValidationErrors, equipmentController.updateEquipment);
router.delete('/:id', requireAdmin, idValidation, handleValidationErrors, equipmentController.deleteEquipment);
export default router;