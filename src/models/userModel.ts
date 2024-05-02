import mongoose, { Document, Schema } from 'mongoose';

export interface UserInterface extends Document {
  userName: string;
  password: string;
  token?: string;
}

const userSchema: Schema<UserInterface> = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: String,
});

const User = mongoose.model<UserInterface>('User', userSchema);

export default User;
