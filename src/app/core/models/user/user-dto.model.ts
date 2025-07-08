import { Role } from '../../enums/role.enum';

export interface UserDto {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  role: Role;
  isActive: boolean;
}
