import { UserRole } from "../../../generated/prisma/enums";

export interface IRegisterUser  {
  userName: string;
  profileImage?: string | null;
  email: string;
  password: string;
  role: UserRole;
};