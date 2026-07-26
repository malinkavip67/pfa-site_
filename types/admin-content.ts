export interface AdminPlayerRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  slug: string;
  birthDate: string | null;
  nationality: string | null;
  city: string | null;
  position: string | null;
  club: string | null;
  height: number | null;
  weight: number | null;
  preferredFoot: string | null;
  description: string | null;
  achievements: string | null;
  photoUrl: string | null;
  videoUrl: string | null;
  isPublished: boolean;
  sortOrder: number;
}

export interface AdminNewsRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  imageUrl: string | null;
  publishedAt: string | null;
  isPublished: boolean;
}

export interface SiteSettingsRecord {
  id: string;
  updatedAt: string;
  siteName: string | null;
  heroTitle: string | null;
  heroSubtitle: string | null;
  heroButtonText: string | null;
  heroButtonLink: string | null;
  phone: string | null;
  email: string | null;
  telegram: string | null;
  whatsapp: string | null;
  address: string | null;
  footerText: string | null;
}
