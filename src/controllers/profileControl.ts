import { Request, Response } from "express";
import { ProfileServices } from "../services/profileService";
import jwt from "jsonwebtoken";
import { AuthReq } from "../middleware/Authenticate";
import Profile from "../models/profileModel";
export class ProfileController {
  //Create Profile
  public static async createProfile(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { Name, AuthorizedAs } = req.body;
      const Id = (req as AuthReq).userId;
      if (!Name || !AuthorizedAs) {
        res.status(400).send({ message: "Missing required fields" });
        return;
      }

      const savedProfile = await ProfileServices.createProfileService(
        Name,
        AuthorizedAs,
        Id
      );
      res
        .status(201)
        .send({ data: savedProfile, message: "Profile created successfully" });
    } catch (error: any) {
      console.error("Error creating profile:", error);

      res
        .status(500)
        .send({ message: error.message || "Error creating profile" });
    }
  }

  //Select Particular Profile
  public static async selectProfile(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      console.log("Fetching Details for Id:", req.params.id);
      const profile = await Profile.findOne({ _id: req.params.id });
      const token = await ProfileServices.FindParticularProfile(req.params.id);
      res.send({ data: token, message: profile });
    } catch (error: any) {
      res
        .status(500)
        .send({ message: error.message || "Error fetching profile" });
    }
  }

  //Show All Profiles
  public static async showProfiles(req: Request, res: Response): Promise<void> {
    try {
      const id = (req as AuthReq).userId?.toString();
      console.log("Fetching profile for refId:", id);
      const profile = await ProfileServices.ShowProfiles(id);
      res.send(profile);
    } catch (error: any) {
      res
        .status(500)
        .send({ message: error.message || "Error fetching profile" });
    }
  }

  //Delete Particular Profile
  public static async DeleteOneProfile(req: Request, res: Response): Promise<void>{
    try {
      const uid = (req as AuthReq).userId?.toString();
      const pid = (req as AuthReq).profileId?.toString();
      await ProfileServices.DeletePaticularProfile(uid,pid)
      res.send({message:`ProfileId Deleted Successfully`})
    } catch (error:any) {
      res.status(500).send({ message: error.message || 'Error deleting profile' });
    }
  }

  //Delete All Profiles
  public static async DeleteAllProfile(req: Request, res: Response): Promise<void>{
    try {
      const uid = (req as AuthReq).userId?.toString();
      await ProfileServices.DeleteAllProfile(uid)
      res.send({message:"All Profiles Deleted Successfully"})
    } catch (error:any) {
      res.status(500).send({ message: error.message || 'Error deleting profiles' });
    }
  }

  //Edit Profile
  public static async EditProfile(req: Request, res: Response): Promise<void>{
    try {
      const uid = (req as AuthReq).userId?.toString();
      const pid = (req as AuthReq).profileId?.toString();
      const body = req.body
      let profile = await ProfileServices.EditProfile(uid,pid,body)
      res.send({data:profile,message:"Profile Updated"})
    } catch (error:any) {
      res.status(500).send({ message: error.message });
    }
  }
}
