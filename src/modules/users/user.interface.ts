import { UserRole } from "../../../generated/prisma/enums";

export interface IRegisterUser  {
  userName: string;
  profileImage?: string | null;
  email: string;
  password: string;
  role: UserRole;
};

export interface IUpdate {
  userName?: string;
  profileImage?: string | null;
  phoneNumber?: string | null;
  occupation?: string | null;
  address?: string | null;
}