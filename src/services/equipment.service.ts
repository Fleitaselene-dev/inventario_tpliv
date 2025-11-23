import EquipmentModel, { IEquipmentDocument } from '../models/equipment.model.js';
import { IEquipment, IEquipmentCreate, IEquipmentUpdate  } from '../types/IEquipment.js';


//  Manejo de la lógica de negocio de equipos
export class EquipmentService {
   
  private toEquipmentObject(equipment: IEquipmentDocument): IEquipment {
    return {
      _id: equipment._id.toString(), 
      name: equipment.name,
      type: equipment.type,
      brand: equipment.brand,
      EquipmentModel: equipment.EquipmentModel,
      serialNumber: equipment.serialNumber,
      status: equipment.status,
      assignedTo: equipment.assignedTo?.toString(),
      specifications: equipment.specifications,
      createdAt: equipment.createdAt,
      updatedAt: equipment.updatedAt
    };
  }


  public async getAllEquipment(
    page: number = 1,
    limit: number = 10,
    filters: any = {}
  ): Promise<{ equipment: IEquipment[]; total: number; page: number; totalPages: number }> {
    const skip = (page - 1) * limit;

   
    const query: any = {};
    if (filters.type) query.type = filters.type;
    if (filters.status) query.status = filters.status;
    if (filters.brand) query.brand = { $regex: filters.brand, $options: 'i' };

    const [equipment, total] = await Promise.all([
      EquipmentModel.find(query)
        .populate('assignedTo', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      EquipmentModel.countDocuments(query)
    ]);


    const equipmentArray = equipment.map(eq => this.toEquipmentObject(eq));

    return {
      equipment: equipmentArray,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }

  public async getEquipmentById(id: string): Promise<IEquipment> {
    const equipment = await EquipmentModel.findById(id).populate('assignedTo', 'name email');
    if (!equipment) {
      throw new Error('Equipo no encontrado');
    }
    return this.toEquipmentObject(equipment);
  }

  
   
  public async createEquipment(equipmentData: IEquipmentCreate): Promise<IEquipment> {
    // Verificar si el número de serie ya existe
    const existingEquipment = await EquipmentModel.findOne({ 
      serialNumber: equipmentData.serialNumber 
    });
    if (existingEquipment) {
      throw new Error('El número de serie ya está registrado');
    }

    const equipment = await EquipmentModel.create(equipmentData);
    return this.toEquipmentObject(equipment);
  }

   
  public async updateEquipment(id: string, updateData: IEquipmentUpdate): Promise<IEquipment> {
    const equipment = await EquipmentModel.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).populate('assignedTo', 'name email');

    if (!equipment) {
      throw new Error('Equipo no encontrado');
    }

    return this.toEquipmentObject(equipment);
  }
   
  public async deleteEquipment(id: string): Promise<void> {
    const equipment = await EquipmentModel.findByIdAndDelete(id);
    if (!equipment) {
      throw new Error('Equipo no encontrado');
    }
  }

  public async getEquipmentByUser(userId: string): Promise<IEquipment[]> {
    const equipment = await EquipmentModel.find({ assignedTo: userId })
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });

    return equipment.map(eq => this.toEquipmentObject(eq));
  }
}