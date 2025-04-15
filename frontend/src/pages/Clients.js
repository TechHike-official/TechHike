import React, { useEffect, useState } from 'react';
import getAllClients from '../services/userService';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getAllClients();
        setClients(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch clients:", error);
        setError("Failed to load clients. Please try again later.");
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) return (
    <div className="font-sans text-black p-6 max-w-4xl mx-auto mt-10 bg-gray-100 rounded-lg shadow-md text-center">
      <p className="text-gray-500">Loading clients...</p>
    </div>
  );

  if (error) return (
    <div className="font-sans text-black p-6 max-w-4xl mx-auto mt-10 bg-gray-100 rounded-lg shadow-md text-center">
      <p className="text-red-500">{error}</p>
    </div>
  );

  return (
    <div className="font-sans text-black p-6 w-full mx-auto mt-16 ">
      <h2 className="text-2xl font-bold mb-6 text-center">Clients List</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Occupation</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">How Heard</th>
            </tr>
          </thead>
          <tbody>
            {clients.length > 0 ? (
              clients.map(client => (
                <tr key={client._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{client.name}</td>
                  <td className="py-3 px-4">{client.email}</td>
                  <td className="py-3 px-4">{client.occupation || 'N/A'}</td>
                  <td className="py-3 px-4">{client.howHeard || 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-500">
                  No clients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clients;