import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Snackbar from '../Components/Snackbar';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const showSnack = (message)=>{
    setSnackbarMessage(message);
  }

  useEffect(() => {
    const validateAccess = async () => {
      const { state } = location;

      if (!state?.verified || !id) {
        navigate('/'); // Redirect to homepage if not coming from a verified email link or if ID is missing
        return;
      }

    //   try {
    //     const response = await axios.get(`https://api.edgedynasty.com:5000/api/user/validate-reset-token/${id}`);

    //     if (!response.data.success) {
    //       navigate('/'); // Redirect to homepage if the token is invalid
    //     }
    //   } catch (error) {
    //     console.error('Error validating token:', error);
    //     navigate('/'); // Redirect to homepage on error
    //   }
    };

    validateAccess();
  }, [id, location, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("h1")

    if (!newPassword || !confirmPassword) {
      setError('Both fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post(`https://api.edgedynasty.com:5000/api/user/reset/password/${id}`, { password: newPassword });

      if (response.data.success) {
        setSuccess('Password updated successfully!');
        navigate('/login');
      } else {
        showSnack(response.data.message || 'Failed to update password.');
      }
    } catch (error) {
      // setSuccess('');

      setError(error.response.data.message);
    }
  };

  return (
    <div className="my-[20px]" style={{ color: "white" }}>
      <div className="login-form max-w-[500px] m-auto px-[20px]">
        <div className="text-center lgheading-org">
          <h2>Reset Password</h2>
        </div>
        <form onSubmit={handleSubmit} className="items-center">
          <div className="mb-8">
            <label style={{ color: "white" }} className='mb-2' htmlFor="new-password">
              New Password:
            </label>
            <input
              placeholder="New Password"
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label style={{ color: "white" }} className='mb-2' htmlFor="confirm-password">
              Confirm Password:
            </label>
            <input
              placeholder="Confirm Password"
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <p className="paraorg mt-2" style={{ color: "red" }}>
              {error}
            </p>
          )}
          {success && (
            <p className="paraorg mt-2" style={{ color: "green" }}>
              {success}
            </p>
          )}
          <div className="text-center my-4">
            <button
              style={{ color: "white" }}
              type="submit"
              className="btnlogin"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
      <Snackbar
        message={snackbarMessage}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
      />
    </div>
  );
};

export default ResetPassword;
