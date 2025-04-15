const mongoose = require('mongoose');

const projectRequestSchema = new mongoose.Schema({
  clientId: {
    type: String,
    required: true,
    ref: 'Client', 
  }, clientName: {
    type: String,
    required: true,
  },
  projectTitle: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  projectDescription: {
    type: String,
    required: true,
  },
  requestStatus: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
  projectStatusUrl: {
    type: String,
    required: false,
  },
}, { timestamps: true });

const ProjectRequest = mongoose.model('ProjectRequest', projectRequestSchema);
module.exports = ProjectRequest;