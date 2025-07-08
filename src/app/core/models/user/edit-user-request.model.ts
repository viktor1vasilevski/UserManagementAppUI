import { Role } from '../../enums/role.enum';

export interface EditUserRequest {
  firstName: string;
  lastName: string;
  role: Role;
  isActive: boolean;
}
