const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const{PROJECT_STATUS,PROJECT_COMPLETION} = require ('../utils/constants')

const Projects = new Schema(
  {
    projectName:String,
    plannedStart:Date,
    plannedEnd:Date,
    actualStart:Date,
    actualEnd:Date,
    team:[{
      type: mongoose.Types.ObjectId,
      ref:'User',
    }],
    projectManager:{
      type: mongoose.Types.ObjectId,
      ref:'User',
    },
   projectStatus:{
      type:String,
      enum:Object.values(PROJECT_STATUS),
      default:PROJECT_STATUS.ON_TRACK
    },
    projectCompletion:{
      type:String,
      enum:Object.values(PROJECT_COMPLETION),
      default:PROJECT_COMPLETION.PENDING
    },
    tasks:[{
        type: mongoose.Types.ObjectId,
        ref:'Task',
    }],
    createdBy:{
      type: mongoose.Types.ObjectId,
      ref:'User',
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", Projects);
