'use client';
import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';

const LogoutButton = () => {
  const router = useRouter();
  const { setToken } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('spotifyAccessToken');
    setToken(null);
    router.push('/');
  };

  return (
    <button onClick={handleLogout} className="outline p-1 bg-gray-500">
      Logout
    </button>
  );
};

export default LogoutButton;
