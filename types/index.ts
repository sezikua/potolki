export type CeilingType = 'glossy' | 'matte' | 'satin' | 'photoprint' | 'suspended' | 'combined';

export type RoomType = 'living-room' | 'bedroom' | 'kitchen' | 'bathroom' | 'office' | 'hallway' | 'other';

export interface Project {
  id: string;
  title: string;
  slug: string;
  type: CeilingType;
  room: RoomType;
  description: string;
  shortDescription: string;
  images: {
    main: string;
    gallery: string[];
    before?: string;
    after?: string;
  };
  specifications: {
    area: number; // м²
    installationTime: string;
    materials: string[];
    color?: string;
  };
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  icon: string;
  images: string[];
  features: string[];
  priceRange?: {
    min: number;
    max: number;
    currency: string;
  };
}

export interface Testimonial {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  project?: string;
  image?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  service?: string;
  area?: number;
}

export interface CalculatorFormData {
  area: number;
  ceilingType: CeilingType;
  roomType: RoomType;
  additionalServices: string[];
  contact: {
    name: string;
    phone: string;
    email?: string;
  };
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  contact: {
    phone: string;
    email: string;
    address: {
      street: string;
      city: string;
      postalCode: string;
      country: string;
    };
    social: {
      facebook?: string;
      instagram?: string;
      youtube?: string;
      viber?: string;
      telegram?: string;
      whatsapp?: string;
    };
  };
}
