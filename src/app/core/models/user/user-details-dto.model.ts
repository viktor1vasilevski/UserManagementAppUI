export interface UserDetailsDto {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  role: string;
  email: string;
  isActive: boolean;
  created: string;
  createdBy: string;
  lastModified?: string;
  lastModifiedBy: string;
}
