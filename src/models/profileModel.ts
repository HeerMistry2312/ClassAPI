import mongoose, { Document, Schema } from 'mongoose';
import { UserInterface } from './userModel'; // Import UserInterface

export interface ProfileInterface extends Document {
  Name: string;
  AuthorizedAs: string;
  RefId: mongoose.Types.ObjectId | UserInterface;
}

const profileSchema: Schema<ProfileInterface> = new Schema({
  Name: {
    type: String,
    required: true,
    unique: true,
  },
  AuthorizedAs: {
    type: String,
    required: true,
  },
  RefId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const ProfileModel = mongoose.model<ProfileInterface>('Profile', profileSchema);

export default ProfileModel;
