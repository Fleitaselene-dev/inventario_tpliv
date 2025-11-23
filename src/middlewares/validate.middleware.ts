import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

// Manejo de errores de validación
 
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: 'Errores de validación',
      errors: errors.array()
    });
    return;
  }
  
  next();
};