const mongoose = require("mongoose");

// create mongoose schema object
const Schema = new mongoose.Schema({
  firstName: {
    type: String,
    // required: [true, "Please add a first name"],
    trim: true,
    maxlength: [25, "First name can not be more then 25 characters"],
  },
  lastName: {
    type: String,
    // required: [true, "Please add a last name"],
    trim: true,
    maxlength: [25, "Last name can not be more then 25 characters"],
  },
  username: {
    type: String,
    required: [true, "Please add a username"],
    unique: true,
    trim: true,
    maxlength: [25, "Username can not be more then 25 characters"],
    minlength: [3, "Username can not be less then 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    trim: true,
    maxlength: [50, "Email can not be more then 20 characters"],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    unique: false,
    trim: true,
    maxlength: [255, "Password can not be more then 255 characters"],
    minlength: [6, "Password can not be less then 6 characters"],
    select: false,
  },
  // profileAvatar: {
  //   type: Number,
  //   default: 0,
  // },
  // profileImage: {
  //   type: String,
  //   default: null,
  // },
  admin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

Schema.pre("save", function (next) {
  this.email = this.email.toLowerCase();
  if (this.firstName) {
    this.firstName = this.firstName.toLowerCase();
  }
  if (this.lastName) {
    this.lastName = this.lastName.toLowerCase();
  }
  next();
});

Schema.pre("remove", function (next) {
  // 'this' is the client being removed. Provide callbacks here if you want
  // to be notified of the calls' result.
  // Sweepstakes.remove({user_id: this._id}).exec();
  // Submission.remove({client_id: this._id}).exec();
  next();
});

// The collection name for this DB is defined in the export
module.exports = mongoose.models.User || mongoose.model("User", Schema);
