const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  clientId: {
    type: String,
    required: true,
    ref: 'Client', // Reference to the Client model
  },
  clientName: {
    type: String,
    required: true,
  },
  platform:{
    type: String,
    required: true
  },
  projectTitle: {
    type: String,
    required: true,
  },
  projectDescription: {
    type: String,
    required: true,
  },
  projectStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'In Progress', 'On Hold', 'Cancelled'],
    default: 'Pending',
  },
  progressPercentage: {
    type: Number,
    min: 0,
    max: 100,
    default: 0, // 0% completed by default
  },
  projectSource: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    required: false,
  },
  paymentStatus: {
    type: Boolean,
    default: false,
  },
  paymentTransactionId: {
    type: String,
    default: null,
  },
  developers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
  snapshots: {
    type: [String],
    required: false,
    default: [],
  },
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
