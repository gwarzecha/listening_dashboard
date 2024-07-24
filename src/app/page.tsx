import React from 'react';
import LoginButton from './components/LoginButton';

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  font-sourcecode p-4">
      <h1 className="text-3xl font-bold mb-4">Login with Spotify</h1>
      <LoginButton />
    </div>
  );
};

export default Login;
