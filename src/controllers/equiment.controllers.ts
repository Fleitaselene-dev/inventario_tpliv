import { Response } from 'express';
import { EquipmentService } from '../services/equipment.service';
import { IEquipmentCreate, IEquipmentUpdate } from '../types/IEquipment';
import { IAuthRequest } from '../types/IAuthRequest';

const equipmentService = new EquipmentService();

export class EquipmentController {
  // ! Obtiene todos los equipos
   
  public async getAllEquipment(req: IAuthRequest, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const filters = {
        type: req.query.type as string,
        status: req.query.status as string,
        brand: req.query.brand as string
      };

      const result = await equipmentService.getAllEquipment(page, limit, filters);

      res.json({
        success: true,
        data: result
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // ! Obtiene un equipo por ID
   
  public async getEquipmentById(req: IAuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const equipment = await equipmentService.getEquipmentById(id);

      res.json({
        success: true,
        data: equipment
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  // ! Crea un nuevo equipo
  public async createEquipment(req: IAuthRequest, res: Response): Promise<void> {
    try {
      const equipmentData: IEquipmentCreate = req.body;
      const equipment = await equipmentService.createEquipment(equipmentData);

      res.status(201).json({
        success: true,
        message: 'Equipo creado exitosamente',
        data: equipment
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // ! Actualiza un equipo existente
  public async updateEquipment(req: IAuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: IEquipmentUpdate = req.body;
      const equipment = await equipmentService.updateEquipment(id, updateData);

      res.json({
        success: true,
        message: 'Equipo actualizado exitosamente',
        data: equipment
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // ! Elimina un equipo
   
  public async deleteEquipment(req: IAuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await equipmentService.deleteEquipment(id);

      res.json({
        success: true,
        message: 'Equipo eliminado exitosamente'
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  // ! Obtiene equipos asignados al usuario actual
   
  public async getMyEquipment(req: IAuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user!._id!;
      const equipment = await equipmentService.getEquipmentByUser(userId);

      res.json({
        success: true,
        data: equipment
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}