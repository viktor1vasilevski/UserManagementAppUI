import { Role } from "../../enums/role.enum";

export interface UserRegisterRequest {
  firstName: string;
  lastName: string;
  username: string;
  role: Role;
  email: string;
  password: string;
  isActive: boolean;
}