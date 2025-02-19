import { Document, model, Schema } from 'mongoose';

interface IName extends Document {
  title: string;
  first: string;
  last: string;
}

interface IPicture extends Document {
  large: string;
  medium: string;
  thumbnail: string;
}

interface IUser extends Document {
  name: IName;
  picture: IPicture;
  permission: boolean;
}

const userSchema = new Schema(
  {
    name: {
      title: { type: String, required: true },
      first: { type: String, required: true },
      last: { type: String, required: true },
    },
    picture: {
      large: { type: String, required: true },
      medium: { type: String, required: true },
      thumbnail: { type: String, required: true },
    },
    permission: { type: Boolean, default: false },
  },
  {
    versionKey: false,
  },
);

userSchema.index({ 'name.last': 1, 'name.first': 1 });

export default model<IUser>('User', userSchema);
