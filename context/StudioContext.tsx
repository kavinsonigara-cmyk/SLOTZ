
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Assignment, FacultySlot, Machine, ResourceBooking, QueueEntry } from '../types';
import { MOCK_ASSIGNMENTS, MOCK_FACULTY_SLOTS, MOCK_MACHINES } from '../constants';

interface StudioContextType {
  assignments: Assignment[];
  addAssignment: (assignment: Assignment) => void;
  deleteAssignment: (id: string) => void;
  slots: FacultySlot[];
  bookSlot: (id: string) => void;
  machines: Machine[];
  updateMachine: (id: string, updates: Partial<Machine>) => void;
  machineBookings: ResourceBooking[];
  bookMachine: (machineId: string, start: string, end: string) => void;
  joinQueue: (machineId: string) => void;
  leaveQueue: (machineId: string) => void;
  resetLabData: () => void;
  profile: { 
    name: string; 
    email: string; 
    studentId: string; 
    bio: string; 
    trainingCompleted: string[]; 
    profileImage: string;
    isIncognito: boolean;
  };
  updateProfile: (data: any) => void;
  updateProfileImage: (url: string) => void;
  toggleIncognito: () => void;
  notifications: string[];
  addNotification: (msg: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const StudioContext = createContext<StudioContextType | undefined>(undefined);

export const StudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const getStored = (key: string, fallback: any) => {
    const stored = localStorage.getItem('slotz-data-' + key);
    return stored ? JSON.parse(stored) : fallback;
  };

  const [assignments, setAssignments] = useState<Assignment[]>(() => getStored('assignments', MOCK_ASSIGNMENTS));
  const [slots, setSlots] = useState<FacultySlot[]>(() => getStored('slots', MOCK_FACULTY_SLOTS));
  
  const [machines, setMachines] = useState<Machine[]>(() => {
    const stored = getStored('machines', MOCK_MACHINES);
    return stored.map((m: Machine) => {
      const mock = MOCK_MACHINES.find(mockM => mockM.id === m.id);
      if (!mock) return m;
      const isDataUrl = m.image?.startsWith('data:');
      return { ...m, ...(!isDataUrl && { image: mock.image }), specifications: mock.specifications };
    });
  });

  const [machineBookings, setMachineBookings] = useState<ResourceBooking[]>(() => getStored('bookings', []));
  const [notifications, setNotifications] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => localStorage.getItem('slotz-theme') === 'dark');
  
  const [profile, setProfile] = useState(() => getStored('profile', {
    name: 'Kavin Sonigara',
    email: 'kavin.s@university.edu',
    studentId: 'ku id 2503u0120',
    bio: 'Product Design student passionate about sustainable UX and local craft integration.',
    trainingCompleted: ['Ceramics', 'Textile', 'Digital Fabrication', 'Wood', 'Metal', 'Leather', 'Resin'],
    profileImage: `https://picsum.photos/seed/KavinSonigara/160/160`,
    isIncognito: false
  }));

  useEffect(() => localStorage.setItem('slotz-data-assignments', JSON.stringify(assignments)), [assignments]);
  useEffect(() => localStorage.setItem('slotz-data-slots', JSON.stringify(slots)), [slots]);
  useEffect(() => localStorage.setItem('slotz-data-machines', JSON.stringify(machines)), [machines]);
  useEffect(() => localStorage.setItem('slotz-data-bookings', JSON.stringify(machineBookings)), [machineBookings]);
  useEffect(() => localStorage.setItem('slotz-data-profile', JSON.stringify(profile)), [profile]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('slotz-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('slotz-theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const resetLabData = () => {
    setMachines(MOCK_MACHINES);
    setSlots(MOCK_FACULTY_SLOTS);
    setMachineBookings([]);
    addNotification('Laboratory inventory reset to system defaults.');
  };

  const updateMachine = (id: string, updates: Partial<Machine>) => {
    setMachines(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
  };

  const addAssignment = (a: Assignment) => setAssignments([a, ...assignments]);
  
  const deleteAssignment = (id: string) => {
    setAssignments(assignments.filter(a => a.id !== id));
    addNotification('Project deleted.');
  };

  const bookSlot = (id: string) => {
    setSlots(slots.map(s => s.id === id ? { ...s, isBooked: true } : s));
    addNotification('Faculty session booked!');
  };

  const bookMachine = (machineId: string, start: string, end: string) => {
    const machine = machines.find(m => m.id === machineId);
    if (!machine) return;

    if (machine.requiresIdentity && profile.isIncognito) {
      addNotification(`High-Hazard Warning: ${machine.name} requires identification.`);
      return;
    }

    if (machine.trainingRequired && !profile.trainingCompleted.includes(machine.category)) {
      addNotification(`Access Denied: ${machine.category} safety certification missing.`);
      return;
    }

    const newBooking: ResourceBooking = {
      id: Math.random().toString(),
      resourceId: machineId,
      resourceType: 'machine',
      startTime: start,
      endTime: end,
      studentId: profile.studentId,
      isAnonymous: profile.isIncognito
    };

    setMachineBookings([...machineBookings, newBooking]);
    setMachines(machines.map(m => m.id === machineId ? { ...m, status: 'In Use' } : m));
    addNotification(`Reservation confirmed: ${machine.name}`);
  };

  const joinQueue = (machineId: string) => {
    const machine = machines.find(m => m.id === machineId);
    if (!machine) return;

    if (machine.requiresIdentity && profile.isIncognito) {
      addNotification(`Verification Required: Disable Incognito for ${machine.name} queue.`);
      return;
    }

    const newEntry: QueueEntry = {
      studentId: profile.studentId,
      studentName: profile.name,
      timestamp: Date.now(),
      priority: assignments.some(a => a.riskAssessment === 'High') ? 2 : 1,
      isAnonymous: profile.isIncognito
    };

    setMachines(machines.map(m => 
      m.id === machineId 
        ? { ...m, queue: [...m.queue, newEntry].sort((a, b) => b.priority - a.priority || a.timestamp - b.timestamp) } 
        : m
    ));
    addNotification(`Joined Queue for ${machine.name}.`);
  };

  const leaveQueue = (machineId: string) => {
    setMachines(machines.map(m => 
      m.id === machineId 
        ? { ...m, queue: m.queue.filter(q => q.studentId !== profile.studentId) } 
        : m
    ));
    addNotification(`Queue position withdrawn.`);
  };

  const updateProfile = (data: any) => setProfile({ ...profile, ...data });
  const updateProfileImage = (url: string) => setProfile({ ...profile, profileImage: url });

  const toggleIncognito = () => {
    const newState = !profile.isIncognito;
    setProfile({ ...profile, isIncognito: newState });
    addNotification(newState ? 'Identity Masking: ACTIVE.' : 'Identity Masking: OFF.');
  };

  const addNotification = (msg: string) => {
    setNotifications(prev => [msg, ...prev]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n !== msg)), 3000);
  };

  return (
    <StudioContext.Provider value={{ 
      assignments, addAssignment, deleteAssignment, slots, bookSlot, 
      machines, updateMachine, machineBookings, bookMachine, joinQueue, leaveQueue, resetLabData,
      profile, updateProfile, updateProfileImage, toggleIncognito, notifications, addNotification,
      isDarkMode, toggleDarkMode
    }}>
      {children}
      <div className="fixed bottom-24 md:bottom-8 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        {notifications.map((n, i) => (
          <div key={i} className="bg-brand-500 text-white px-5 py-3 rounded-2xl shadow-2xl animate-in slide-in-from-right-4 pointer-events-auto border border-brand-400/50 text-xs font-black uppercase tracking-widest">
            {n}
          </div>
        ))}
      </div>
    </StudioContext.Provider>
  );
};

export const useStudio = () => {
  const context = useContext(StudioContext);
  if (!context) throw new Error('useStudio must be used within StudioProvider');
  return context;
};
