const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    imgFull: { type: String },
    imgTitle: { type: String },
    imgThumbnail: { type: String },
    imgMobile: { type: String },
    imgPreview: { type: String },
    seasonCount: { type: Number },
    headline: { type: String },
    description: { type: String, required: true },
    year: { type: Number },
    limit: { type: Number },
    genre: { type: String },
    isSeries: { type: Boolean, default: false },
    actor: { type: String },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
