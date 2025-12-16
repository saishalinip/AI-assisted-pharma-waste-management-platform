// Mock data for the pharma waste management platform

export type UserRole = 'manager' | 'sub-manager' | 'segregation-staff' | 'viewer';
export type Permission = 'manage-users' | 'edit-company' | 'upload-waste' | 'view-requests' | 'create-requests';

export const hasPermission = (role: UserRole, permission: Permission): boolean => {
  const permissions: Record<UserRole, Permission[]> = {
    'manager': ['manage-users', 'edit-company', 'upload-waste', 'view-requests', 'create-requests'],
    'sub-manager': ['upload-waste', 'view-requests', 'create-requests'],
    'segregation-staff': ['upload-waste', 'view-requests'],
    'viewer': ['view-requests'],
  };
  return permissions[role]?.includes(permission) || false;
};

export interface Manufacturer {
  id: string;
  companyName: string;
  location: string;
  email: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  verificationDocument?: string;
  createdAt: string;
}

export interface ManufacturerUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  manufacturerId: string;
  status: 'active' | 'inactive';
}

export interface MaterialPricing {
  material: string;
  minPrice: number;
  maxPrice: number;
}

export interface Recycler {
  id: string;
  organizationName: string;
  location: string;
  email: string;
  materialsProcessed: string[];
  materialPricing: MaterialPricing[];
  pricingConfigured: boolean;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  verificationDocument?: string;
  distance?: number;
  rating?: number;
  createdAt: string;
}

export interface WasteUpload {
  id: string;
  imageUrl: string;
  quantity: number;
  unit: 'kg' | 'tons';
  category?: string;
  location: string;
  identifiedMaterials: MaterialClassification[];
  status: 'pending' | 'classified' | 'request-sent' | 'recycled';
  createdAt: string;
  manufacturerId: string;
}

export interface MaterialClassification {
  type: 'PVC' | 'Aluminum' | 'Multilayer' | 'HDPE' | 'PP' | 'Unknown';
  confidence: number;
  isPrimary: boolean;
}

export interface RecyclingRequest {
  id: string;
  wasteUploadId: string;
  recyclerId: string;
  recyclerName: string;
  manufacturerId: string;
  manufacturerName: string;
  materialType: string;
  quantity: number;
  unit: 'kg' | 'tons';
  location: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  contactRequested: boolean;
  contactApproved: boolean;
  recyclerContact?: { email: string; phone: string };
  manufacturerContact?: { email: string; phone: string };
  proofDocuments?: string[];
  createdAt: string;
  acceptedAt?: string;
  completedAt?: string;
  imageUrl?: string;
}

// Mock Data
export const mockManufacturers: Manufacturer[] = [
  { id: 'mfr-001', companyName: 'PharmaCorp Industries', location: 'Mumbai, Maharashtra', email: 'contact@pharmacorp.in', verificationStatus: 'verified', verificationDocument: '/docs/gst-cert.pdf', createdAt: '2024-01-15' },
];

export const mockManufacturerUsers: ManufacturerUser[] = [
  { id: 'usr-001', email: 'manager@pharmacorp.in', name: 'Rajesh Kumar', role: 'manager', manufacturerId: 'mfr-001', status: 'active' },
  { id: 'usr-002', email: 'submanager@pharmacorp.in', name: 'Priya Sharma', role: 'sub-manager', manufacturerId: 'mfr-001', status: 'active' },
  { id: 'usr-003', email: 'staff1@pharmacorp.in', name: 'Amit Patel', role: 'segregation-staff', manufacturerId: 'mfr-001', status: 'active' },
  { id: 'usr-004', email: 'viewer@pharmacorp.in', name: 'Sneha Desai', role: 'viewer', manufacturerId: 'mfr-001', status: 'inactive' },
];

export const mockRecyclers: Recycler[] = [
  { id: 'rec-001', organizationName: 'GreenCycle Solutions', location: 'Pune, Maharashtra', email: 'contact@greencycle.in', materialsProcessed: ['PVC', 'Aluminum', 'HDPE'], materialPricing: [{ material: 'PVC', minPrice: 25, maxPrice: 35 }, { material: 'Aluminum', minPrice: 40, maxPrice: 55 }, { material: 'HDPE', minPrice: 20, maxPrice: 30 }], pricingConfigured: true, verificationStatus: 'verified', verificationDocument: '/docs/license.pdf', distance: 120, rating: 4.5, createdAt: '2024-02-01' },
  { id: 'rec-002', organizationName: 'EcoWaste Recyclers', location: 'Nashik, Maharashtra', email: 'info@ecowaste.in', materialsProcessed: ['Multilayer', 'PP', 'Aluminum'], materialPricing: [{ material: 'Multilayer', minPrice: 30, maxPrice: 45 }, { material: 'PP', minPrice: 25, maxPrice: 40 }, { material: 'Aluminum', minPrice: 45, maxPrice: 60 }], pricingConfigured: true, verificationStatus: 'verified', verificationDocument: '/docs/gst.pdf', distance: 180, rating: 4.2, createdAt: '2024-01-20' },
  { id: 'rec-003', organizationName: 'PharmRecycle India', location: 'Ahmedabad, Gujarat', email: 'hello@pharmrecycle.in', materialsProcessed: ['PVC', 'Multilayer', 'HDPE', 'Aluminum'], materialPricing: [], pricingConfigured: false, verificationStatus: 'verified', verificationDocument: '/docs/cert.pdf', distance: 450, rating: 4.8, createdAt: '2024-01-10' },
  { id: 'rec-004', organizationName: 'CleanPharma Recycling', location: 'Surat, Gujarat', email: 'support@cleanpharma.in', materialsProcessed: ['Aluminum', 'PP'], materialPricing: [{ material: 'Aluminum', minPrice: 35, maxPrice: 50 }, { material: 'PP', minPrice: 28, maxPrice: 42 }], pricingConfigured: true, verificationStatus: 'pending', distance: 280, rating: 3.9, createdAt: '2024-03-01' },
];

export const mockWasteUploads: WasteUpload[] = [
  { id: 'waste-001', imageUrl: '/placeholder.svg', quantity: 250, unit: 'kg', category: 'Blister Packs', location: 'Mumbai, Maharashtra', identifiedMaterials: [{ type: 'PVC', confidence: 85, isPrimary: true }, { type: 'Aluminum', confidence: 72, isPrimary: false }], status: 'classified', createdAt: '2024-03-10', manufacturerId: 'mfr-001' },
  { id: 'waste-002', imageUrl: '/placeholder.svg', quantity: 500, unit: 'kg', category: 'Packaging', location: 'Mumbai, Maharashtra', identifiedMaterials: [{ type: 'HDPE', confidence: 91, isPrimary: true }], status: 'request-sent', createdAt: '2024-03-08', manufacturerId: 'mfr-001' },
  { id: 'waste-003', imageUrl: '/placeholder.svg', quantity: 1.2, unit: 'tons', category: 'Mixed Waste', location: 'Mumbai, Maharashtra', identifiedMaterials: [{ type: 'Multilayer', confidence: 78, isPrimary: true }, { type: 'PP', confidence: 65, isPrimary: false }], status: 'recycled', createdAt: '2024-02-25', manufacturerId: 'mfr-001' },
];

export const mockRecyclingRequests: RecyclingRequest[] = [
  { id: 'req-001', wasteUploadId: 'waste-002', recyclerId: 'rec-001', recyclerName: 'GreenCycle Solutions', manufacturerId: 'mfr-001', manufacturerName: 'PharmaCorp Industries', materialType: 'HDPE', quantity: 500, unit: 'kg', location: 'Mumbai, Maharashtra', status: 'accepted', contactRequested: true, contactApproved: true, recyclerContact: { email: 'contact@greencycle.in', phone: '+91 98765 43210' }, createdAt: '2024-03-08', acceptedAt: '2024-03-09', imageUrl: '/placeholder.svg' },
  { id: 'req-002', wasteUploadId: 'waste-003', recyclerId: 'rec-002', recyclerName: 'EcoWaste Recyclers', manufacturerId: 'mfr-001', manufacturerName: 'PharmaCorp Industries', materialType: 'Multilayer', quantity: 1.2, unit: 'tons', location: 'Mumbai, Maharashtra', status: 'completed', contactRequested: true, contactApproved: true, recyclerContact: { email: 'info@ecowaste.in', phone: '+91 98765 12345' }, proofDocuments: ['/docs/receipt-001.pdf', '/docs/certificate-001.pdf'], createdAt: '2024-02-25', acceptedAt: '2024-02-26', completedAt: '2024-03-05', imageUrl: '/placeholder.svg' },
  { id: 'req-003', wasteUploadId: 'waste-001', recyclerId: 'rec-003', recyclerName: 'PharmRecycle India', manufacturerId: 'mfr-001', manufacturerName: 'PharmaCorp Industries', materialType: 'PVC', quantity: 250, unit: 'kg', location: 'Mumbai, Maharashtra', status: 'pending', contactRequested: false, contactApproved: false, createdAt: '2024-03-10', imageUrl: '/placeholder.svg' },
];

// Helper functions
export const getRecyclerById = (id: string) => mockRecyclers.find(r => r.id === id);
export const getManufacturerById = (id: string) => mockManufacturers.find(m => m.id === id);
export const getRequestsByManufacturer = (manufacturerId: string) => mockRecyclingRequests.filter(r => r.manufacturerId === manufacturerId);
export const getRequestsByRecycler = (recyclerId: string) => mockRecyclingRequests.filter(r => r.recyclerId === recyclerId);
export const getRecyclersByMaterial = (material: string) => mockRecyclers.filter(r => r.materialsProcessed.includes(material) && r.pricingConfigured);
export const simulateApiDelay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));
export const mockClassifyWaste = async () => {
  await simulateApiDelay(2000);
  const types: MaterialClassification['type'][] = ['PVC', 'Aluminum', 'Multilayer', 'HDPE', 'PP'];
  const idx = Math.floor(Math.random() * types.length);
  return [{ type: types[idx], confidence: 75 + Math.random() * 20, isPrimary: true }] as MaterialClassification[];
};
export const MATERIAL_TYPES = ['PVC', 'Aluminum', 'Multilayer', 'HDPE', 'PP'] as const;