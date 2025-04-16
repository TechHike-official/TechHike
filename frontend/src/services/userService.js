import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_API;

export const  getAllClients = async () => {
    try {
        const response = await axios.get(`${API_URL}/user/all`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching client accounts:', error);
        throw error;
    }
};


export const getUsersByIds = async (developerIds) => {
    console.log("DEVDD:", developerIds)
    try {
        const response = await axios.post(`${API_URL}/user/by-ids`, {
            ids: developerIds
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching developer users:', error);
        throw error;
    }
};

