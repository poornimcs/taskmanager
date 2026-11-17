import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const Trips = () => {
  const { user } = useAuth(); // Access user token from context
  const [formData, setFormData] = useState({
    tripName: '',
    destination: '',
    startDate: '',
    endDate: '',
  });
  const [loading, setLoading] = useState(false);

  /*useEffect(() => {
    // Fetch profile data from the backend
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/api/trips', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setFormData({
          tripName: response.data.tripName,
          destination: response.data.destination,
          startDate: response.data.startDate || '',
          endDate: response.data.endDate || '',
        });
      } catch (error) {
        alert('Failed to fetch trip information. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchProfile();
  }, [user]);
*/
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post('/api/trips', formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      alert('Trip created successfully!');
    } catch (error) {
      alert('Failed to create trip. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-20">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
        <h1 className="text-2xl font-bold mb-4 text-center">Create Trip</h1>
        Trip Name: 
        <input
          type="text"
          placeholder=""
          value={formData.tripName}
          onChange={(e) => setFormData({ ...formData, tripName: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        Destination:
        <input
          type="text"
          placeholder=""
          value={formData.destination}
          onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        Start Date:
        <input
          type="date"
          placeholder=""
          value={formData.startDate}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        End Date:
        <input
          type="date"
          placeholder="End Date"
          value={formData.endDate}
          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
          
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          {loading ? 'Creating...' : 'Create Trip'}
        </button>
      </form>
    </div>
  );
};

export default Trips;
