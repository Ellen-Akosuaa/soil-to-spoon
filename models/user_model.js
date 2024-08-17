import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const userSchema = new Schema({

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    otherNames: { type: String },
    username: { type: String, lowercase: true, required: true, unique: true },
    email: { type: String, lowercase: true, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String },
    termsAndConditions: { type: Boolean },
    userType: { type: String, enum: ["Farmer", "Consumer"], required: true },


}, {
    timestamps: true
});

userSchema.plugin(toJSON);

export const userModel = model("User", userSchema)