import bcrypt from "bcryptjs";
import { UserStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { ILoginUser } from "./auth.interface";
import { createToken } from "../../utils/createToken";
import config from "../../config";
import { JwtPayload, SignOptions } from "jsonwebtoken";
import { verifyToken } from "../../utils/verifyToken";

const loginUser = async (payLoad: ILoginUser) => {
  const { email, password } = payLoad;

  if (!email || !password) {
    throw new Error("Email and Password are required");
  }

  const user = await prisma.users.findUniqueOrThrow({
    where: {
      email: email,
    },
  });

  if (user.status === UserStatus.BANNED) {
    throw new Error("Your account has been Banned. Please contact support.");
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    throw new Error("Invalid Password");
  }

  const jwtPayload = {
    userId: user.userId,
    userName: user.userName,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in as SignOptions,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in as SignOptions,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  if (!token) {
    throw new Error("Refresh token is required");
  }

  const verifyRefreshToken = verifyToken(token, config.jwt_refresh_secret);
  if (!verifyRefreshToken.success) {
    throw new Error("Invalid refresh token");
  }
  const { userId } = verifyRefreshToken.data as JwtPayload;

  const user = await prisma.users.findUniqueOrThrow({
    where: {
      userId: userId,
    },
  });

  if (user.status === UserStatus.BANNED) {
    throw new Error("Your account has been Banned. Please contact support.");
  }

  const jwtPayload = {
    userId: user.userId,
    userName: user.userName,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in as SignOptions,
  );

  return {
    accessToken,
  };
};

export const authService = {
  loginUser,
  refreshToken,
};
