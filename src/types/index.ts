export interface MissionaryContact {
  email?: string;
  email2?: string;
  phone?: string;
  phone2?: string;
  address?: string[];
  address2?: string[];
  link?: string;
  link2?: string;
  none?: boolean;
}

export interface Missionary {
  name: string;
  url: string;
  location: string;
  picture: string;
  pictureUrl?: string;
  description: string;
  bio: string;
  contact?: MissionaryContact | null;
  gallery?: string[];
  sendingChurch?: string;
  ministryStarted?: string;
  duration?: string;
  /* V3 Gospel Workers profile fields */
  role?: string;
  region?: string;
  yearsOfService?: string;
  quote?: string;
}

export interface LeadershipMember {
  name: string;
  role: string;
  picture: string;
}

export interface StatItem {
  value: string;
  label: string;
}
