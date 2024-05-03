
import jwt from "jsonwebtoken";
import Profile from "../models/profileModel";

export class ProfileServices {
  //create Profile Service
  public static async createProfileService(
    Name: string,
    AuthorizedAs: string,
    RefId: string | undefined
  ): Promise<void> {
    const profile = new Profile({ Name, AuthorizedAs, RefId });
    await profile.save();
    console.log(profile);
  }

  //Select Paticular Profile
  public static async FindParticularProfile(id: string): Promise<string> {
    const profile = await Profile.findOne({ _id: id });
    if (!profile) {
      console.log("No profile found for Id:", id);
      return `No profile found `;
    }
    const token = jwt.sign(
      { profile: profile._id, user: profile.RefId },

      "HeerMistry",
      { expiresIn: "7h" }
    );
    return token;
  }

  //Show all Profiles
  public static async ShowProfiles(id: string|undefined): Promise<object>{
    const profile = await Profile.find({ RefId: id});
    if (!profile || profile.length === 0) {
        console.log("No profile found ");
        return {message:"No Profile Found"}
      }
    const Name = profile.map((profile) => profile.Name);

    console.log("Extracted Names:", Name);
    return profile;
  }

  //Delete Particular Profile
  public static async DeletePaticularProfile(userId: string|undefined,profileId: string|undefined): Promise<void>{
    const  del = await Profile.findOne({_id: profileId, RefId: userId })
    if (!del) {
        console.log("not found")
        return
      }
      //await Cart.findOneAndDelete({profileId:profileId})
      await Profile.findOneAndDelete({_id: profileId, RefId: userId })
  }

  //Delete All Profiles

  public static async DeleteAllProfile(userId: string|undefined):Promise<void>{
    const  del = await Profile.find({RefId: userId})
    console.log(del)
    if(!del){
        console.log("No Profiles")
        return
    }
    //await Cart.({profileId:profileId})
    await Profile.deleteMany({RefId: userId})
  }

  //Edit Profile
  public static async EditProfile(userId: string|undefined,profileId: string|undefined,body:object): Promise<void>{
    let profile = await Profile.findOne({_id: profileId, RefId: userId })
    if(!profile){
        console.log("No Profile Found")
        return
    }
    profile = await Profile.findByIdAndUpdate(profileId,body)

    profile?.save()

  }

}
