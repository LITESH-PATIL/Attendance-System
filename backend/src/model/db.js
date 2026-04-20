import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ["teacher", "student"], 
    default: "student" 
  }
});

const classSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true
  },
  teacherId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  studentIds: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }]
});

const attendanceSchema = new mongoose.Schema({
  classId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Class' 
  },
  studentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  status: { 
    type: String, 
    enum: ["present", "absent"], 
    default: "absent" 
  }
});

const User = mongoose.model("User", userSchema);
const Class = mongoose.model("Class", classSchema);
const Attendance = mongoose.model("Attendance", attendanceSchema);

export { User, Class, Attendance };
