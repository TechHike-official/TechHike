const mongoose = require("mongoose");

const assistRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming a User model exists
    required: true,
  },
  projectName: {
    type: String,
    required: true,
    trim: true,
  },
  projectType: {
    type: String,
    required: true,
    enum: ["Mobile", "Desktop", "Web"],
  },
  projectTechnologies: {
    type: [String], // Array of technologies
    default: [],
  },
  requestStatus: {
    type: String,
    enum: ["Pending", "Reviewing", "Approved", "Declined"],
    default: "Pending",
  },
  assistStatus: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },
  amount: {
    type: Number,
    default: null, // Set by admin
  },
  paymentQrCode: {
    type: String,
    default: null, // URL to QR code image, set by admin
  },
  paymentType: {
    type: String,
    enum: ["Google Pay", "Razorpay", null],
    default: null, // Set when user pays
  },
  paymentStatus: { // New field for payment status
    type: String,
    enum: ["Pending", "Paid"],
    default: "Pending", // Default to "Pending"
  },
  transactionId: {
    type: String,
    default: null, // Set after successful payment
  },
  feedback: {
    type: String,
    default: null, // Client feedback
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null, // Client rating (1-5)
  },
  developerName: {
    // New field for developer's name
    type: String,
    default: null,
  },
  developerPhone: {
    // Existing field for developer's phone number
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

assistRequestSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("AssistRequest", assistRequestSchema);
