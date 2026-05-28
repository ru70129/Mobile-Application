import { useState } from 'react';
import { useAuthStore } from '../../../common/store/authStore';
import { login as authLogin, signup as authSignup, forgotPassword as authForgotPassword } from '../services/authService';

export const useAuthViewModel = () => {
  const { user, login, logout } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [infoMessage, setInfoMessage] = useState(null);

  const clearMessages = () => {
    setError(null);
    setInfoMessage(null);
  };

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    clearMessages();

    try {
      const authUser = await authLogin({ email, password });
      login(authUser);
      return authUser;
    } catch (err) {
      setError(err?.message || 'Login failed.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async ({ email, password }) => {
    setLoading(true);
    clearMessages();

    try {
      const authUser = await authSignup({ email, password });
      login(authUser);
      return authUser;
    } catch (err) {
      setError(err?.message || 'Signup failed.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (email) => {
    setLoading(true);
    clearMessages();

    try {
      const response = await authForgotPassword(email);
      setInfoMessage(response.message);
      return response;
    } catch (err) {
      setError(err?.message || 'Password reset failed.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    clearMessages();
  };

  return {
    user,
    loading,
    error,
    infoMessage,
    clearMessages,
    handleLogin,
    handleSignup,
    handleForgotPassword,
    handleLogout,
    isAuthenticated: user !== null,
  };
};
