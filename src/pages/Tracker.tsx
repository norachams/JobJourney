import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

interface Classification {
  email_id: string;
  subject: string; 
  classification: string;
  company_name: string; 
}
const Tracker: React.FC = () => {
  const [user] = useAuthState(auth);
  const [classifications, setClassifications] = useState<Classification[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    const fetchClassifications = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiServer = 'http://127.0.0.1:5000/tracker';
        const response = await fetch(apiServer);

        if (!response.ok) {
          throw new Error(`HTTP Error. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched Classifications:', data);
        setClassifications(data || []);
        // Set the last updated time
        const now = new Date();
        const formattedDate = now.toLocaleString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
        setLastUpdated(formattedDate);
      } catch (error) {
        console.error('Error fetching classifications:', error);
        setError('Error fetching classifications.');
      } finally {
        setLoading(false);
      }
    };

    fetchClassifications();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">Welcome, {user?.displayName || 'Guest'}</h1>
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md mb-4 md:mb-0 md:mr-4">
            <h2 className="text-xl font-semibold mb-4">Last Updated:</h2>
            <p className="text-gray-600">{lastUpdated}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            <p className="text-gray-600">Maybe instructions or something to show how it's used.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md md:ml-4">
            <h2 className="text-xl font-semibold mb-4">Status</h2>
            {loading ? (
              <p>Loading classifications...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <>
                <p className="text-blue-600">Submitted: {classifications.filter(c => c.classification === 'Application Received').length}</p>
                <p className="text-red-600">Rejected: {classifications.filter(c => c.classification === 'Rejected').length}</p>
                <p className="text-green-600">Interview: {classifications.filter(c => c.classification === 'Interview').length}</p>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="bg-white p-6 rounded-lg shadow-md mb-4 md:mb-0 md:mr-4 flex-1">
            <h2 className="text-xl text-blue-600 font-semibold mb-4">Applications Submitted</h2>
            <div className="space-y-2">
              {classifications.filter(c => c.classification === 'Application Received').map(c => (
                <div key={c.email_id} className="bg-gray-200 rounded-full py-2 px-4">
                  {c.company_name}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md mb-4 md:mb-0 md:ml-4 flex-1">
            <h2 className="text-xl text-red-600 font-semibold mb-4">Rejected</h2>
            <div className="space-y-2">
              {classifications.filter(c => c.classification === 'Rejected').map(c => (
                <div key={c.email_id} className="bg-gray-200 rounded-full py-2 px-4">
                  {c.company_name}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md md:ml-4 flex-1">
            <h2 className="text-xl text-green-600 font-semibold mb-4">Interview</h2>
            <div className="space-y-2">
              {classifications.filter(c => c.classification === 'Interview').map(c => (
                <div key={c.email_id} className="bg-gray-200 rounded-full py-2 px-4">
                  {c.company_name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracker;