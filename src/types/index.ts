export type Role = "student" | "professor" | "superadmin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export interface Reagent {
  _id: string;
  name: string;
  formula?: string;
  casNumber?: string;
  quantity: number;
  unit: string;
  location?: string;
  hazardClass?: string;
  msdsLink?: string;
  lowStockThreshold: number;
  notes?: string;
}

export interface Material {
  _id: string;
  name: string;
  category?: string;
  quantity: number;
  unit?: string;
  location?: string;
  notes?: string;
}

export interface Equipment {
  _id: string;
  name: string;
  brand?: string;
  model?: string;
  serialNumber?: string;
  status: "available" | "in_use" | "maintenance" | "retired";
  location?: string;
  description?: string;
  imageURL?: string;
  manualLink?: string;
}

export interface Space {
  _id: string;
  name: string;
  description?: string;
  capacity?: number;
  location?: string;
  isActive: boolean;
}

export type ReservationStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "completed"
  | "cancelled";

export interface SpaceReservation {
  _id: string;
  userId: string;
  spaceId: string;
  date: string;
  timeBlocks: string[];
  status: ReservationStatus;
  notes?: string;
}

export interface EquipmentReservation {
  _id: string;
  userId: string;
  equipmentId: string;
  date: string;
  timeBlocks: string[];
  status: ReservationStatus;
  notes?: string;
}

export interface ReagentRequest {
  _id: string;
  userId: string;
  reagentId: string;
  quantity: number;
  unit: string;
  justification?: string;
  status: "pending" | "approved" | "rejected" | "delivered" | "cancelled";
}

export interface Manual {
  _id: string;
  title: string;
  description?: string;
  subject?: string;
  fileUrl: string;
  coverUrl?: string;
  tags: string[];
  uploadedBy: string;
  visibility: "public" | "students" | "professors";
}

export interface PublicProfessor {
  _id: string;
  name: string;
  email?: string;
  education?: string;
  asignatures: string[];
  interestAreas: string[];
  imgURL?: string;
  order: number;
}

export interface SafetyRule {
  _id: string;
  title: string;
  content: string;
  order: number;
  iconName?: string;
}
