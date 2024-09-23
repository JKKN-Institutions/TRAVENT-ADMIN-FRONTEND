// src/components/GoogleLoginButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider, signInWithPopup } from '../../../src/firebase';
import axios from 'axios';
import "./InstituteSelection.css";

function GoogleLoginButton({ selectedInstitute, selectedRole }) {
  const navigate = useNavigate();

    // Configure the provider to include the prompt parameter
    provider.setCustomParameters({
      prompt: 'select_account'
    });
  

  const onSuccess = async (result) => {
    const user = result.user;
    const token = await user.getIdToken();
    const email = user.email;
    console.log('Login Success:', user);

    // Validate email domain
    if (!email.endsWith('@jkkn.ac.in')) {
      alert('Only @jkkn.ac.in emails are allowed');
      // Sign out the user immediately if the email domain is not valid
      auth.signOut();
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/api/auth/google', {
        token,
        institute: selectedInstitute,
        role: selectedRole,
      });

      const userData = res.data;

      console.log("ppppppp", res.data)

      switch (userData.role) {
        case 'Admin':
          navigate('/admin-dashboard');
          break;
        case 'Staff':
          navigate('/staff-dashboard');
          break;
        case 'Student/Parent':
          navigate('/student-dashboard');
          break;
        default:
          console.error('Invalid role.');
      }
    } catch (error) {
      console.error('Login Failed:', error);
    }
  };

  const onFailure = (error) => {
    console.log('Login Faileddddd:', error);
  };

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then(onSuccess)
      .catch(onFailure);
  };

  return (
    <a className="google-login-icon" onClick={handleLogin}><img src='./uploads/google.png'/></a>
  );
}

export default GoogleLoginButton;
