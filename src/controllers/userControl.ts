import { Request, Response } from "express";
import { UserServices } from "../services/userService";
import { AuthReq } from "../middleware/Authenticate";
export class UserController {
  //Create User
  public static async signUpUser(req: Request, res: Response): Promise<void> {
    try {
      const { userName, password } = req.body;
      await UserServices.signUpService(userName, password);
      res.status(200).send({ message: "User Registered" });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  //login User
  public static async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { userName, password } = req.body;
      await UserServices.loginService(userName, password);
      res.status(200).send({ message: "User Login Successfully" });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  //logout User
  public static async logoutUser(req: Request, res: Response): Promise<void> {
    try {
      const id: string | undefined = (req as AuthReq).userId;
      await UserServices.logoutService(id);
      res.status(200).send({ message: "User logged Out Successfully" });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  //Remove User
  public static async removeUser(req: Request, res: Response): Promise<void> {
    try {
      const id: string | undefined = (req as AuthReq).userId;
      await UserServices.removeService(id);
      res.status(200).send({ message: "User removed Successfully" });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  //Edit User
  public static async editUser(req: Request, res: Response): Promise<void> {
    try {
      const id: string | undefined = (req as AuthReq).userId;
      await UserServices.editService(id, req.body);
      res.status(200).send({ message: "User Updated Successfully" });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }
}
