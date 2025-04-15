const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  developerIds: [{  // Change to an array of developers
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Developer',
    required: true,
  }],
  assignedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'on_hold'],
    default: 'active',
  },
}, { timestamps: true });

const Assignment = mongoose.model('Assignment', assignmentSchema);
module.exports = Assignment;
