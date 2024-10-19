import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const token = searchParams.get('token');
      const type = searchParams.get('type');

      if (!token || !type) {
        navigate('/');
        setMessage('Invalid link: Missing token or type.');
        setIsError(true);
        return;
      }
let response;
      try {
        if(type=== 'signup'){
         response = await axios.get(`http://localhost:5000/api/user/verify-email?token=${token}&type=${type}`);
        }else if(type=== 'forgot-password'){
           response = await axios.get(`http://localhost:5000/api/user/verify-reset-email?token=${token}&type=${type}`);
        }

        if (response.data.success) {
          if (type === 'signup') {
            navigate('/');
          } else if (type === 'forgot-password') {
            navigate(`/reset-password/${response.data.userId}`, { state: { verified: true } });
          }
        } else {
          navigate('/');
          setMessage(response.data.message || 'Invalid or expired token.');
          setIsError(true);
        }
      } catch (error) {
        // navigate('/');
        console.log(error)
        setMessage('Error verifying email. Please try again later.');
        setIsError(true);
      }
    };

    verifyEmail();
  }, [navigate]);

  return (
    <div className="h-[400px] bg-black flex items-center justify-center p-6 w-[100%]">
      <div className="max-w-md bg-gray-800 shadow-lg rounded-lg p-8">
        <p className={`text-[24px] text-center ${isError ? 'text-red-500' : 'text-gray-100'}`} style={{fontWeight:"600"}}>
          {message || 'Verifying your email...'}
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
