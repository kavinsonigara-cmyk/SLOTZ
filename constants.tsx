
import React from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  Calendar, 
  Package, 
  User, 
  Settings,
  Monitor,
  Scissors,
  Printer,
  Box,
  Camera,
  Layers,
  Wind,
  Zap,
  Hammer,
  Waves
} from 'lucide-react';
import { Assignment, FacultySlot, Material, Machine } from './types';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
  { id: 'estimator', label: 'AI Estimator', icon: <Sparkles size={20} />, path: '/estimator' },
  { id: 'booking', label: 'Workshops', icon: <Calendar size={20} />, path: '/booking' },
  { id: 'materials', label: 'Materials', icon: <Package size={20} />, path: '/materials' },
  { id: 'profile', label: 'Profile', icon: <User size={20} />, path: '/profile' },
  { id: 'settings', label: 'Settings', icon: <Settings size={20} />, path: '/settings' },
];

export const MOCK_ASSIGNMENTS: Assignment[] = [
  {
    id: '1',
    title: 'Street Food Sustainable Packaging',
    description: 'Developing biodegradable alternatives for local tea stalls and chaat vendors in Ahmedabad.',
    deadline: '2024-05-15',
    status: 'Prototype',
    progress: 65,
    riskAssessment: 'Medium'
  },
  {
    id: '2',
    title: 'ASHA Worker Rural Health App',
    description: 'Service design and UI/UX for maternal health tracking in rural Gujarat clusters.',
    deadline: '2024-05-20',
    status: 'Design',
    progress: 80,
    riskAssessment: 'Low'
  },
  {
    id: '3',
    title: 'Ergonomic Loom for Ikat Weavers',
    description: 'Redesigning handloom components to reduce lower back strain for traditional artisans.',
    deadline: '2024-06-05',
    status: 'Research',
    progress: 25,
    riskAssessment: 'High'
  }
];

export const MOCK_FACULTY_SLOTS: FacultySlot[] = [
  { id: 'f1', facultyName: 'Prof. Christian Saumya', startTime: '2024-05-12T10:00:00', endTime: '2024-05-12T11:00:00', isBooked: false },
  { id: 'f2', facultyName: 'Prof. Shatabhisha', startTime: '2024-05-12T14:30:00', endTime: '2024-05-12T15:30:00', isBooked: false },
  { id: 'f3', facultyName: 'Prof. Ruchin Soni', startTime: '2024-05-13T11:00:00', endTime: '2024-05-13T12:00:00', isBooked: false },
  { id: 'f4', facultyName: 'Prof. Deepak', startTime: '2024-05-13T15:00:00', endTime: '2024-05-13T16:00:00', isBooked: false },
  { id: 'f5', facultyName: 'Prof. Yuti', startTime: '2024-05-14T09:30:00', endTime: '2024-05-14T10:30:00', isBooked: false },
  { id: 'f6', facultyName: 'Prof. Jagan', startTime: '2024-05-14T14:00:00', endTime: '2024-05-14T15:00:00', isBooked: false },
  { id: 'f7', facultyName: 'Prof. Sarvesh', startTime: '2024-05-15T10:00:00', endTime: '2024-05-15T11:00:00', isBooked: false },
];

export const MOCK_MACHINES: Machine[] = [
  // CERAMICS
  {
    id: 'c1',
    name: 'Shimpo RK-3D Electric Wheel',
    category: 'Ceramics',
    location: 'Ceramics Annex 1',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1593113511335-900504620023?auto=format&fit=crop&q=80&w=1200',
    specifications: ['High Torque', 'Quiet Operation', '30cm Wheelhead'],
    safetyLevel: 1,
    trainingRequired: true,
    maxDurationMinutes: 120,
    queue: [],
    requiresIdentity: false
  },
  {
    id: 'c2',
    name: 'Skutt KMT-1227 Electric Kiln',
    category: 'Ceramics',
    location: 'Firing Room B',
    status: 'In Use',
    image: 'https://images.unsplash.com/photo-1565193298357-bb6a03f47382?auto=format&fit=crop&q=80&w=1200',
    specifications: ['Touchscreen Controller', 'Large Capacity', 'Up to Cone 10'],
    safetyLevel: 3,
    trainingRequired: true,
    maxDurationMinutes: 480,
    queue: [
      { studentId: 's101', studentName: 'Jordan S.', timestamp: Date.now() - 3600000, priority: 1, isAnonymous: false }
    ],
    requiresIdentity: true
  },
  // WOOD
  {
    id: 'w1',
    name: 'SawStop Cabinet Saw',
    category: 'Wood',
    location: 'Main Wood Lab',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?auto=format&fit=crop&q=80&w=1200',
    specifications: ['Blade Brake Safety', '3HP Motor', '52" T-Glide Fence'],
    safetyLevel: 3,
    trainingRequired: true,
    maxDurationMinutes: 45,
    queue: [],
    requiresIdentity: true
  },
  {
    id: 'w2',
    name: 'Laguna 14|12 Bandsaw',
    category: 'Wood',
    location: 'Main Wood Lab',
    status: 'Maintenance',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=1200',
    specifications: ['Pyramid Tension System', 'Disc Brake', 'Balanced Wheels'],
    safetyLevel: 2,
    trainingRequired: true,
    maxDurationMinutes: 60,
    queue: [],
    requiresIdentity: false
  },
  // TEXTILE
  {
    id: 't1',
    name: 'Brother PR1055X Embroidery',
    category: 'Textile',
    location: 'Textile Studio 3',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1550262100-349073a1104e?auto=format&fit=crop&q=80&w=1200',
    specifications: ['10-Needle Embroidery', 'Camera Positioning', 'Wireless Link'],
    safetyLevel: 1,
    trainingRequired: true,
    maxDurationMinutes: 180,
    queue: [],
    requiresIdentity: false
  },
  // DIGITAL FABRICATION
  {
    id: 'df1',
    name: 'Epilog Fusion Pro 48',
    category: 'Digital Fabrication',
    location: 'Digi-Fab Hub',
    status: 'In Use',
    image: 'https://images.unsplash.com/photo-1614705592520-a61665a3885d?auto=format&fit=crop&q=80&w=1200',
    specifications: ['120W Laser', 'IRIS Camera System', 'Touchscreen'],
    safetyLevel: 2,
    trainingRequired: true,
    maxDurationMinutes: 45,
    queue: [
      { studentId: 's202', studentName: 'Casey L.', timestamp: Date.now() - 1200000, priority: 2, isAnonymous: true }
    ],
    requiresIdentity: false
  },
  {
    id: 'df2',
    name: 'Ultimaker S5 3D Printer',
    category: 'Digital Fabrication',
    location: 'Digi-Fab Hub',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=1200',
    specifications: ['Dual Extrusion', 'Large Build Volume', 'Active Leveling'],
    safetyLevel: 1,
    trainingRequired: true,
    maxDurationMinutes: 1440,
    queue: [],
    requiresIdentity: false
  },
  // METAL
  {
    id: 'm1',
    name: 'Miller Multimatic 220',
    category: 'Metal',
    location: 'Metal Shop South',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1200',
    specifications: ['Multi-Process Welding', 'Auto-Set Elite', 'Digital Display'],
    safetyLevel: 3,
    trainingRequired: true,
    maxDurationMinutes: 60,
    queue: [],
    requiresIdentity: true
  },
  {
    id: 'm2',
    name: 'Precision Metal Lathe',
    category: 'Metal',
    location: 'Metal Shop South',
    status: 'In Use',
    image: 'https://images.unsplash.com/photo-1620614917464-90a6e87f551b?auto=format&fit=crop&q=80&w=1200',
    specifications: ['Variable Speed', 'Digital Readout', 'High Precision'],
    safetyLevel: 3,
    trainingRequired: true,
    maxDurationMinutes: 120,
    queue: [
      { studentId: 's404', studentName: 'Sam T.', timestamp: Date.now() - 900000, priority: 1, isAnonymous: false }
    ],
    requiresIdentity: true
  },
  // LEATHER
  {
    id: 'l1',
    name: 'Artisan 3000 Stitcher',
    category: 'Leather',
    location: 'Soft Goods Lab',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1598300042247-d04527cbc3f0?auto=format&fit=crop&q=80&w=1200',
    specifications: ['Cylinder Arm', 'Walking Foot', 'Heavy Duty Stitching'],
    safetyLevel: 2,
    trainingRequired: true,
    maxDurationMinutes: 60,
    queue: [],
    requiresIdentity: false
  },
  // RESIN
  {
    id: 'r1',
    name: 'Formlabs Form 3B SLA',
    category: 'Resin',
    location: 'Clean Fabrication Lab',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1631035222329-3715104d5386?auto=format&fit=crop&q=80&w=1200',
    specifications: ['Biocompatible Ready', 'LFS Technology', 'Automated Wash'],
    safetyLevel: 2,
    trainingRequired: true,
    maxDurationMinutes: 720,
    queue: [],
    requiresIdentity: false
  }
];

export const MOCK_MATERIALS: Material[] = [
  {
    id: 'mat-clay-1',
    name: 'Stoneware Clay',
    category: 'Ceramics',
    vendors: [
      { id: 'v-clay-1', name: 'Morbi Ceramic Supplies', price: 35.00, distanceKm: 180, deliveryDays: 4 },
      { id: 'v-clay-2', name: 'Ahmedabad Clay Hub', price: 42.00, distanceKm: 12, deliveryDays: 1 },
    ]
  },
  {
    id: 'mat-wood-1',
    name: 'Mango/Pine Wood Planks',
    category: 'Wood',
    vendors: [
      { id: 'v-wood-1', name: 'Ahmedabad Timber Mart', price: 210.00, distanceKm: 8, deliveryDays: 2 },
      { id: 'v-wood-2', name: 'Plywood Dealers Vatva', price: 180.00, distanceKm: 15, deliveryDays: 3 },
    ]
  },
  {
    id: 'mat-wood-2',
    name: 'Teak Wood (Premium)',
    category: 'Wood',
    vendors: [
      { id: 'v-teak-1', name: 'Ahmedabad Import Yards', price: 3500.00, distanceKm: 25, deliveryDays: 5 },
      { id: 'v-teak-2', name: 'Elite Hardwoods GIDC', price: 4200.00, distanceKm: 30, deliveryDays: 4 },
    ]
  },
  {
    id: 'mat-wood-3',
    name: 'Plywood / MDF (8x4 ft)',
    category: 'Wood',
    vendors: [
      { id: 'v-ply-1', name: 'Hardware Market City', price: 85.00, distanceKm: 5, deliveryDays: 1 },
      { id: 'v-ply-2', name: 'Eco Wood Solutions', price: 95.00, distanceKm: 22, deliveryDays: 2 },
    ]
  },
  {
    id: 'mat-metal-1',
    name: 'Brass Sheets/Rods',
    category: 'Metal',
    vendors: [
      { id: 'v-brass-1', name: 'Jamnagar Brass Works', price: 580.00, distanceKm: 310, deliveryDays: 6 },
      { id: 'v-brass-2', name: 'Ahmedabad Metal Traders', price: 650.00, distanceKm: 10, deliveryDays: 1 },
    ]
  },
  {
    id: 'mat-metal-2',
    name: 'Mild Steel (MS) Sheets',
    category: 'Metal',
    vendors: [
      { id: 'v-ms-1', name: 'Vatva Fabrication Supply', price: 62.00, distanceKm: 12, deliveryDays: 1 },
      { id: 'v-ms-2', name: 'Industrial Steel Mart', price: 58.00, distanceKm: 45, deliveryDays: 3 },
    ]
  },
  {
    id: 'mat-metal-3',
    name: 'Stainless Steel (SS 304)',
    category: 'Metal',
    vendors: [
      { id: 'v-ss-1', name: 'SS Industrial Hub', price: 220.00, distanceKm: 18, deliveryDays: 2 },
      { id: 'v-ss-2', name: 'Metal Market Central', price: 240.00, distanceKm: 6, deliveryDays: 1 },
    ]
  },
  {
    id: 'mat-metal-4',
    name: 'Aluminum Sheets/Sections',
    category: 'Metal',
    vendors: [
      { id: 'v-al-1', name: 'Alu-Pro Sections', price: 270.00, distanceKm: 14, deliveryDays: 1 },
      { id: 'v-al-2', name: 'Gujarat Metal Mart', price: 290.00, distanceKm: 20, deliveryDays: 2 },
    ]
  },
  {
    id: 'mat-stone-1',
    name: 'Float / Toughened Glass',
    category: 'Stone',
    vendors: [
      { id: 'v-glass-1', name: 'Glass Processors Naroda', price: 140.00, distanceKm: 15, deliveryDays: 3 },
      { id: 'v-glass-2', name: 'Ahmedabad Glass Art', price: 180.00, distanceKm: 9, deliveryDays: 2 },
    ]
  },
  {
    id: 'mat-resin-1',
    name: 'Epoxy Resin Kits',
    category: 'Resin',
    vendors: [
      { id: 'v-epoxy-1', name: 'Ahmedabad Chemical Depot', price: 575.00, distanceKm: 11, deliveryDays: 1 },
      { id: 'v-epoxy-2', name: 'Prototyping Resins', price: 650.00, distanceKm: 35, deliveryDays: 2 },
    ]
  },
  {
    id: 'mat-resin-2',
    name: 'Polyester Resin',
    category: 'Resin',
    vendors: [
      { id: 'v-poly-1', name: 'Industrial Chemicals Hub', price: 325.00, distanceKm: 25, deliveryDays: 2 },
      { id: 'v-poly-2', name: 'Composite Mat Depot', price: 300.00, distanceKm: 40, deliveryDays: 3 },
    ]
  },
  {
    id: 'mat-resin-3',
    name: 'Silicone Rubber (RTV)',
    category: 'Resin',
    vendors: [
      { id: 'v-sil-1', name: 'Mold Making Supplies', price: 1250.00, distanceKm: 15, deliveryDays: 2 },
      { id: 'v-sil-2', name: 'RTV Silicone Mart', price: 1400.00, distanceKm: 8, deliveryDays: 1 },
    ]
  },
  {
    id: 'mat-resin-4',
    name: 'Fiberglass Mat (Roll)',
    category: 'Resin',
    vendors: [
      { id: 'v-fiber-1', name: 'Fiberglass Distributors', price: 160.00, distanceKm: 20, deliveryDays: 2 },
      { id: 'v-fiber-2', name: 'Composite Mat Mart', price: 185.00, distanceKm: 5, deliveryDays: 1 },
    ]
  }
];

export const STATUS_COLORS = {
  Research: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200',
  Design: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-200',
  Prototype: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200',
  Review: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200',
  Complete: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200',
};

export const RISK_COLORS = {
  Low: 'text-emerald-500 dark:text-emerald-400',
  Medium: 'text-amber-500 dark:text-amber-400',
  High: 'text-rose-500 dark:text-rose-400',
};

export const MACHINE_ICONS = {
  'Ceramics': <Waves size={20} />,
  'Wood': <Hammer size={20} />,
  'Stone': <Box size={20} />,
  'Leather': <Layers size={20} />,
  'Metal': <Zap size={20} />,
  'Resin': <Wind size={20} />,
  'Textile': <Scissors size={20} />,
  'Digital Fabrication': <Printer size={20} />,
  'Laser Cutter': <Scissors size={20} />,
  '3D Printer': <Printer size={20} />,
  'CNC Machine': <Box size={20} />,
  'Plotter': <Monitor size={20} />,
  'Media': <Camera size={20} />
};

export const LAB_CATEGORIES = [
  'Ceramics', 'Wood', 'Stone', 'Leather', 'Metal', 'Resin', 'Textile', 'Digital Fabrication'
];
