
export enum UserRole {
  STUDENT = 'student',
  FACULTY = 'faculty',
  ADMIN = 'admin'
}

export type RiskLevel = 'Low' | 'Medium' | 'High';
export type SafetyLevel = 1 | 2 | 3; // 1: General, 2: Supervised, 3: Expert Only

export interface Assignment {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: 'Research' | 'Design' | 'Prototype' | 'Review' | 'Complete';
  progress: number;
  riskAssessment: RiskLevel;
}

export interface EstimationResult {
  complexity: 'Low' | 'Medium' | 'High';
  screen_count: number;
  estimated_hours_min: number;
  estimated_hours_max: number;
  explanation: string;
  risk_level: RiskLevel;
}

export interface FacultySlot {
  id: string;
  facultyName: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export type MachineCategory = 
  | 'Ceramics' 
  | 'Wood' 
  | 'Stone' 
  | 'Leather' 
  | 'Metal' 
  | 'Resin' 
  | 'Textile' 
  | 'Digital Fabrication';

export interface QueueEntry {
  studentId: string;
  studentName: string;
  timestamp: number;
  priority: number;
  isAnonymous: boolean; // Added for Incognito support
}

export interface Machine {
  id: string;
  name: string;
  category: MachineCategory;
  location: string;
  status: 'Available' | 'In Use' | 'Maintenance';
  image: string;
  specifications: string[];
  safetyLevel: SafetyLevel;
  trainingRequired: boolean;
  maxDurationMinutes: number;
  queue: QueueEntry[];
  requiresIdentity: boolean; // High risk machines may forbid incognito
}

export interface ResourceBooking {
  id: string;
  resourceId: string; // faculty id or machine id
  resourceType: 'faculty' | 'machine';
  startTime: string;
  endTime: string;
  studentId: string;
  isAnonymous: boolean; // Added for Incognito support
}

export interface MaterialVendor {
  id: string;
  name: string;
  price: number;
  distanceKm: number;
  deliveryDays: number;
}

export interface Material {
  id: string;
  name: string;
  category: string;
  vendors: MaterialVendor[];
}
