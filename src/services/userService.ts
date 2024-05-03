import User from "../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export class UserServices {
  //Create User
  public static async signUpService(
    userName: string,
    password: string
  ): Promise<void> {
    if (await User.findOne({ userName })) {
      throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ userName, password: hashedPassword });
    await newUser.save();
    console.log(newUser);
  }

  //login User
  public static async loginService(
    userName: string,
    password: string
  ): Promise<string> {
    let user = await User.findOne({ userName });
    if (!user) {
      throw new Error("User Doesnt Exists");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Password Incorrect");
    }
    const token = jwt.sign({ id: user._id }, "HeerMistry", { expiresIn: "7h" });
    user.token = token;
    return token;
  }

  //logout User
  public static async logoutService(userId: string | undefined): Promise<void> {
    const user = await User.findById({ _id: userId });
    if (user) {
      user.token = ""; // Remove token from user object
      await user.save();
    }
  }

  //remove User
  public static async removeService(userId: string | undefined): Promise<void> {
    let remove = await User.deleteOne({ _id: userId });
    if (remove.deletedCount === 0) {
      throw new Error("User not found");
    }
  }

  //edit User
  public static async editService(
    userId: string | undefined,
    userData: any
  ): Promise<void> {
    let user = await User.findByIdAndUpdate(userId, userData, { new: true });
    if (!user) {
      throw new Error("User not found");
    }
  }
}
