const Project = require('../models/Project');
const Assignment = require('../models/Assignment');
const ProjectRequest = require('../models/ProjectRequest'); // Import missing model
const User = require('../models/User'); // Ensure you have the correct User model import


exports.submitProjectRequest = async (req, res) => {
  const {clientId, projectTitle, projectDescription } = req.body;

  console.log("ClientID:", clientId)


  try {
    const user = await User.findById(clientId);


    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newRequest = new ProjectRequest({
      clientId, // Assign the found user's ID as clientId
      projectTitle,
      clientName: user.name,
      phoneNumber:user.phoneNumber,
      email: user.email,
      projectDescription,
      requestStatus: 'Pending'
      
    });

    await newRequest.save();
    res.status(201).json({ requestId: newRequest._id  });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting request', error: err.message });
  }
};

exports.getClientProjectRequests = async (req, res) => {

    const { clientId } = req.params;  // ✅ Correct

  console.log("C",clientId)
  try {
    const requests = await ProjectRequest.find({ clientId });
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching requests', error: err.message });
  }
};

exports.getAllProjectRequests = async (req, res) => {
    console.log("Gett ALl")
  try {
    const requests = await ProjectRequest.find();
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching requests', error: err.message });
  }
};

exports.approveProjectRequest = async (req, res) => {
  console.log("Approve ahead");
  const { requestId } = req.params;
  const { developerIds, price } = req.body; // Accept price in request

  try {
      // Find the project request by ID
      const request = await ProjectRequest.findById(requestId);
      if (!request) return res.status(404).json({ message: 'Request not found' });

      // Find the client details
      const client = await User.findById(request.clientId);
      if (!client) return res.status(404).json({ message: 'Client not found' });

      // Create a new project with the approved request details
      const newProject = new Project({
          clientId: request.clientId,
          clientName: client.name,
          projectTitle: request.projectTitle,
          projectDescription: request.projectDescription,
          projectStatus: 'Pending', // Default status
          price: price,
          developers: developerIds
      });

      await newProject.save(); // Save the project first

      // Update the request with the new project ID
      request.requestStatus = 'Approved';
      request.clientName = client.name;
      request.registeredId = client._id;
      request.price = price;
      request.developers = developerIds;
      request.projectStatusUrl = newProject._id; // Now we can assign the ID

      await request.save(); // Save the updated request

      res.status(200).json({
          message: 'Project request approved successfully and new project created',
          projectId: newProject._id,
          clientName: request.clientName,
          registeredId: request.registeredId,
          price: request.price,
          developers: request.developers,
      });

  } catch (err) {
      res.status(500).json({ message: 'Error approving request', error: err.message });
  }
};

exports.getUserRequests = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch requests where clientId matches the userId
    const requests = await ProjectRequest.find({ clientId: userId }).select(
      'projectTitle clientName createdAt requestStatus projectStatusUrl'
    );

    if (!requests || requests.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No requests found for this user',
      });
    }

    res.status(200).json({
      success: true,
      data: requests,
      message: 'User requests retrieved successfully',
    });
  } catch (error) {
    console.error('Error fetching user requests:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve user requests',
      error: error.message,
    });
  }
};