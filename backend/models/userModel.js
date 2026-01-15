import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    description: { type: String },
    role: { type: String, enum: ["educator", "student"], required: true },
    photoUrl: { type: String, default: "" },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    
    // Gamification Fields
    xp: { type: Number, default: 0 },
    rank: { type: String, default: "Novice" },
    completedLectures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' }],

    resetOtp: { type: String },
    otpExpires: { type: Date },
    isOtpVerifed: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;