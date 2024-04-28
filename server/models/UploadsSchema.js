const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const File = new Schema(
  {
    uploadFile: String,
    file: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("File", File);
