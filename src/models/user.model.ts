import mongoose, { Schema, Document, Types } from 'mongoose';
import { IEquipment, EquipmentStatus, EquipmentType } from '../types/IEquipment';

export interface IEquipmentDocument extends IEquipment, Document {
  _id: Types.ObjectId;
}

const EquipmentSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: Object.values(EquipmentType),
    required: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  EquipmentModel: {
    type: String,
    required: true,
    trim: true
  },
  serialNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  status: {
    type: String,
    enum: Object.values(EquipmentStatus),
    default: EquipmentStatus.AVAILABLE
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
}, {
  timestamps: true
});

EquipmentSchema.index({ status: 1 });
EquipmentSchema.index({ type: 1 });

export default mongoose.model<IEquipmentDocument>('Equipment', EquipmentSchema);