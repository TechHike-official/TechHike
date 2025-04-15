import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_API;

const getAllClients = async () => {
    try {
        const response = await axios.get(`${API_URL}/user/all`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching client accounts:', error);
        throw error;
    }
};

export default getAllClients;
