const Project = require('../models/Project');
const User = require("../models/User")
const Assignment = require('../models/Assignment');

exports.getAssignedProjects = async (req, res) => {
    const { userId } = req.params; // Extract userId from route parameters
    console.log("Assigned Projects", userId)
    try {
        const projects = await Project.find({ developers: userId });
      res.status(200).json(projects);
    } catch (err) {
      res.status(500).json({ 
        message: 'Error fetching assigned projects', 
        error: err.message 
      });
    }
  }

exports.updateProjectStatus = async (req, res) => {
  const { projectId } = req.params;
  const { status } = req.body;
  try {
    const project = await Project.findByIdAndUpdate(projectId, { projectStatus: status }, { new: true });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json({ message: 'Project status updated', project });
  } catch (err) {
    res.status(500).json({ message: 'Error updating status', error: err.message });
  }
};

exports.assignDevelopers = async (req, res) => {
  const { projectId } = req.params;
  const { developerIds } = req.body;
  try {
    await Assignment.deleteMany({ projectId }); // Clear existing assignments
    for (const developerId of developerIds) {
      const assignment = new Assignment({ projectId, developerId });
      await assignment.save();
    }
    res.status(200).json({ message: 'Developers assigned successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error assigning developers', error: err.message });
  }
};

exports.getAllProjects = async (req, res) => {
    try {
      // Fetch projects with specific fields
      const projects = await Project.find().select('_id projectTitle projectStatus projectDescription paymentStatus');
  
      // Transform the data to match the requested field names
      const transformedProjects = projects.map(project => ({
        projectId: project._id.toString(), // Rename _id to projectId and convert to string
        projectTitle: project.projectTitle,
        status: project.projectStatus, // Rename projectStatus to status
        projectDescription: project.projectDescription,
        paymentStatus: project.paymentStatus
      }));
  
      // Send the transformed data as a JSON response
      res.status(200).json(transformedProjects);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching projects', error: err.message });
    }
  };


  exports.getProjectInfo = async (req, res) => {
    try {
      // Extract projectId from request parameters
      const { projectId } = req.params;
  
      // Fetch the specific project by ID with selected fields
      const project = await Project.findById(projectId)
  
      // Check if the project exists
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
     
  
      // Send the transformed data as a JSON response
      res.status(200).json(project);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching project', error: err.message });
    }
  };



  exports.getProjectsOfUser = async (req, res) => {
    try {
      const { clientId } = req.params;
  
      // Find all projects where clientId matches
      const projects = await Project.find({ clientId });
  
      res.status(200).json({
        success: true,
        data: projects
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching projects",
        error: error.message
      });
    }
  };


  exports.updatePaymentInfo = async (req, res) => {
    const { projectId } = req.params;
    const { type, transactionId, paymentMode } = req.body; // type = 'advance' or 'remaining'
  
    try {
      const project = await Project.findById(projectId);
      if (!project) return res.status(404).json({ message: 'Project not found' });

  
      if (type === 'advance') {
        project.payment.advancePaid = true;
        project.payment.advanceTransactionId = transactionId;
        project.paymentMode = paymentMode
        project.payment.advancePaidDate = new Date();

      } else if (type === 'remaining') {
        project.payment.remainingPaid = true;
        project.payment.remainingTransactionId = transactionId;
        project.paymentMode = paymentMode
        project.payment.advancePaidDate = new Date();
      } else {
        return res.status(400).json({ message: 'Invalid payment type' });
      }
  
      await project.save();
      res.status(200).json({ message: 'Payment info updated', project });
    } catch (err) {
      res.status(500).json({ message: 'Error updating payment info', error: err.message });
    }
  };


  
  exports.confirmFullPayment = async (req, res) => {
    const { projectId } = req.params;
  
    try {
      const project = await Project.findById(projectId);
      if (!project) return res.status(404).json({ message: 'Project not found' });
  
      if (project.payment.advancePaid && project.payment.remainingPaid) {
        project.payment.isFullyPaidConfirmedByAdmin = true;
        await project.save();
        return res.status(200).json({ message: 'Full payment confirmed by admin', project });
      } else {
        return res.status(400).json({ message: 'Both payments not completed yet' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Error confirming payment', error: err.message });
    }
  };


