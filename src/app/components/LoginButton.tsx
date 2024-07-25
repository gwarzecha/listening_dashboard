'use client';
import React from 'react';

const LoginButton = () => {
  const authorize = () => {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
    const scopes = ['user-read-private', 'user-read-email', 'user-top-read'];

    const params = new URLSearchParams({
      client_id: clientId!,
      response_type: 'code',
      redirect_uri: redirectUri!,
      scope: scopes.join(' '),
    });

    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
  };

  return (
    <button
      className="outline p-1 bg-gray-600 font-sourcecode"
      onClick={authorize}
    >
      Login
    </button>
  );
};

export default LoginButton;
