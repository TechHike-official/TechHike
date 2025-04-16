const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  clientId: {
    type: String,
    required: true,
    ref: 'Client',
  },
  clientName: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
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
    default: 0,
  },
  projectSource: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    required: false,
  },

  // ✅ Payment related fields
  payment: {
    advancePaid: {
      type: Boolean,
      default: false,
    },
    advanceTransactionId: {
      type: String,
      default: null,
    },
    remainingPaid: {
      type: Boolean,
      default: false,
    },
    remainingTransactionId: {
      type: String,
      default: null,
    },
    isFullyPaidConfirmedByAdmin: {
      type: Boolean,
      default: false,
    }
  },
  paymentMode:{
    type: String

  },

  developers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
  snapshots: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
