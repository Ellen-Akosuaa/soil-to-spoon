import { Schema, model } from "mongoose";

const userSchema = new Schema({

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    otherNames: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String },
    termsAndConditions: { type: Boolean },
    role: { type: String, enum: ["farmer", "consumer"], required: true },


}, {
    timestamps: true
});

export const userModel = model("User", userSchema)