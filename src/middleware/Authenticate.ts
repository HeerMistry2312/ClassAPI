import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";
import { Types } from "mongoose";
export interface AuthReq extends Request {
  userId?: string;
  profileId?: string;
}
export class AuthMiddleware {
  //Authenticate User
  public static async authUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      let token = req.header("Authorization");

      if (!token) {
        res.status(401).send({ message: "Token is missing" });
        return;
      }

      token = token!.replace("Bearer ","")
      const decoded = Jwt.verify(token,"HeerMistry") as {id: Types.ObjectId}
      (req as AuthReq).userId = decoded.id.toString();
      next();
    } catch (error) {
      res.status(500).send({ message: error });
    }
  }

  //Authenticate Profile
  public static async authProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      let token = req.header("Authorization");

      if (!token) {
        res.status(401).send({ message: "Token is missing" });
        return;
      }
      token = token!.replace("Bearer ","")
      const decoded = Jwt.verify(token,"HeerMistry") as {user: Types.ObjectId,profile: Types.ObjectId}
        (req as AuthReq).userId = decoded.user.toString();
        (req as AuthReq).profileId = decoded.profile.toString();
      next();
    } catch (error) {}
  }
}
