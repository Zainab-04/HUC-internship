import mongoose, { Schema, model, models, Document } from 'mongoose';

// 1. Define the Interface
export interface IUser extends Document {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Define the Schema
const UserSchema = new Schema<IUser>(
  {
    email: { 
      type: String, 
      required: [true, "Email is required"], 
      unique: true 
    },
    password: { 
      type: String, 
      required: [true, "Password is required"] 
    },
  },
  { timestamps: true }
);

// 3. Export the Model (with existence check)
export const User = models.User || model<IUser>('User', UserSchema);