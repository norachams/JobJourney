import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase'; // Adjust the path as necessary

const Tracker: React.FC = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">Welcome, {user?.displayName || 'Guest'}</h1>
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md mb-4 md:mb-0 md:mr-4">
            <h2 className="text-xl font-semibold mb-4">Last Updated: --/--/----</h2>
            <p className="text-gray-600">Deadline: --/--/----</p>
            <p className="text-gray-600">Participants: ---, ---, ---</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            <p className="text-gray-600">Maybe instructions or something to show how it's used.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md md:ml-4">
            <h2 className="text-xl font-semibold mb-4">Status</h2>
            <p className="text-gray-600">Submitted: </p>
            <p className="text-gray-600">Rejected: </p>
            <p className="text-gray-600">Interview: </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="bg-white p-6 rounded-lg shadow-md mb-4 md:mb-0 md:mr-4 flex-1">
            <h2 className="text-xl font-semibold mb-4">Applications Submitted</h2>
            {/* Applications Submitted Data will go here */}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md mb-4 md:mb-0 md:ml-4 flex-1">
            <h2 className="text-xl font-semibold mb-4">Rejected</h2>
            {/* Rejected Data will go here */}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md md:ml-4 flex-1">
            <h2 className="text-xl font-semibold mb-4">Interview</h2>
            {/* Interview Data will go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracker;
