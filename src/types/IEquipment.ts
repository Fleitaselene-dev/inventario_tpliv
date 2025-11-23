export enum EquipmentStatus {
  AVAILABLE = 'available',
  IN_USE = 'in_use',
  MAINTENANCE = 'maintenance',
  RETIRED = 'retired'
}

export enum EquipmentType {
  LAPTOP = 'laptop',
  DESKTOP = 'desktop',
  MONITOR = 'monitor',
  PRINTER = 'printer',
  SERVER = 'server',
  OTHER = 'other'
}

export interface IEquipment {
  _id: any | string;
  name: string;
  type: EquipmentType;
  brand: string;
  EquipmentModel: string;
  serialNumber: string;
  status: EquipmentStatus;
  assignedTo?: string; // User ID
  specifications?: {
    processor?: string;
    ram?: string;
    storage?: string;
    operatingSystem?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IEquipmentCreate {
  name: string;
  type: EquipmentType;
  brand: string;
  EquipmentModel: string;
  serialNumber: string;
  status: EquipmentStatus;
  assignedTo?: string;
  specifications?: {
    processor?: string;
    ram?: string;
    storage?: string;
    operatingSystem?: string;
  };
}

export interface IEquipmentUpdate {
  name?: string;
  type?: EquipmentType;
  brand?: string;
  EquipmentModel?: string;
  status?: EquipmentStatus;
  assignedTo?: string;
  specifications?: {
    processor?: string;
    ram?: string;
    storage?: string;
    operatingSystem?: string;
  };
}