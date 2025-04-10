
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  address: string; // Changed from optional to required
  ipAddress?: string;
  deviceInfo?: string;
  osInfo?: string;
  browserInfo?: string;
  location?: string;
  weather?: string;
  timestamp?: string;
}
