import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { prisma } from "../lib/prisma";
import { catchAsync } from "../utils/catchAsync";
import { UserRole, UserStatus } from "../../generated/prisma/enums";
import { verifyToken } from "../utils/verifyToken";

declare global {
  namespace Express {
    interface Request {
      user?: {
        email: string;
        userName: string;
        userId: string;
        role: UserRole;
      };
    }
  }
}



export const auth = (...requiredRoles: UserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
    const token = req.cookies.accessToken
      ? req.cookies.accessToken
      : req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization?.split(" ")[1]
        : req.headers.authorization;

    if (!token) {
      throw new Error(
        "You are not logged in. Please log in to access this resource.",
      );
    }

    const verifiedToken = verifyToken(token, config.jwt_access_secret);

    if (!verifiedToken.success) {
      throw new Error(verifiedToken.error);
    }

    const { userId, role } = verifiedToken.data as JwtPayload;

    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new Error(
        "Forbidden. You don't have permission to access this resource.",
      );
    }

    const user = await prisma.users.findUnique({
      where: {
        userId
      },
    });

    if (!user) {
      throw new Error("User not found. Please log in again.");
    }

    if (user.status === UserStatus.BANNED) {
      throw new Error("Your account has been Banned. Please contact support.");
    }

    req.user = {
      email: user.email,
      userName: user.userName,
      userId: user.userId,
      role: user.role,
    };

    next();
  });
};