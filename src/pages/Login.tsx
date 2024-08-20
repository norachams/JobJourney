import React from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; 
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const responseMessage = async (response: CredentialResponse) => {
    if (response.credential) {
      const credential = GoogleAuthProvider.credential(response.credential);
      try {
        await signInWithCredential(auth, credential);
        navigate('/tracker');
      } catch (error) {
        console.error('Firebase sign-in failed:', error);
      }
    } else {
      console.error('Google credential is missing');
    }
  };

  const errorMessage = () => {
    console.error('Google Login Failed');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-login bg-cover">
      <div className="flex h-screen">
        <div className="flex flex-col justify-center items-center w-1/2 bg-white p-10 ">
          <h2 className="text-7xl font-semibold mb-12 text-center leading-tight">
            Organize your Job hunt journey by tracking your job applications
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis maximus
          </p>
          <div className="flex justify-center mb-8 scale-150">
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
          </div>
          <p className="text-center text-gray-500 mt-4">
            By signing up, you agree to the <a href="#" className="text-blue-500">Terms of Service</a> and <a href="#" className="text-blue-500">Privacy Policy</a>, including <a href="#" className="text-blue-500">cookie use</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
