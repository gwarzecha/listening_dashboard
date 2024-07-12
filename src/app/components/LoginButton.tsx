'use client';
import React from 'react';

const LoginButton = () => {
  const authorize = () => {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
    const scopes = ['user-read-private', 'user-read-email'];

    if (!clientId) {
      throw new Error(
        'Spotify client ID and client secret must be set as environment variables.'
      );
    }

    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('response_type', 'code');
    params.append('redirect_uri', redirectUri!);
    params.append('scope', scopes.join(' '));

    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
  };

  return <button onClick={authorize}>Login</button>;
};

export default LoginButton;
