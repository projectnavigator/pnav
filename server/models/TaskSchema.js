const mongoose = require("mongoose");
const { TASK_STATUS, TASK_PRIORITY } = require("../utils/constants");
const Schema = mongoose.Schema;

const Tasks = new Schema(
  {
    taskName: String,
    project:[{
      type: mongoose.Types.ObjectId,
      ref:'Project',
    }]
,
    priority: {
      type:Number,
      enum:Object.values(TASK_PRIORITY),
      default:TASK_PRIORITY.MID
    },
    assignedUser:[{
      type: mongoose.Types.ObjectId,
      ref:'User',
    }],
    taskStatus:{
      type:String,
      enum:Object.values(TASK_STATUS),
      default:TASK_STATUS.FOR_APPROVAL
    },
    createdBy:{
      type: mongoose.Types.ObjectId,
      ref:'User',
    }
  },
  { timestamps:true}
);

module.exports = mongoose.model("Task", Tasks);
