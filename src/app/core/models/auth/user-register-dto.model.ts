import { Role } from "../../enums/role.enum";

export interface UserRegisterDto {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  role: Role;
  email: string;
  isActive: boolean;
  createdBy: string;
  created: string;
}
