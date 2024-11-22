import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  userId: String,
  songId: String,
},{
    timestamps: true,
  }
)

export const Favorite = mongoose.model(
  "Favorite",
  favoriteSchema,
  "favorites",
)