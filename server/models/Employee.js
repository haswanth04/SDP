import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  resumes: [{
    title: String,
    filename: String,
    uploadDate: {
      type: Date,
      default: Date.now
    },
    fileUrl: String,
    status: {
      type: String,
      enum: ['active', 'archived'],
      default: 'active'
    }
  }]
});

const EmployeeModel = mongoose.model("employees", EmployeeSchema);

export default EmployeeModel;
