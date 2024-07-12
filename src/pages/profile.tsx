import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('spotifyAccessToken');
      if (token) {
        const response = await axios.get('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h1>Logged in as {profile.display_name}</h1>
      {profile.images.length > 0 && (
        <img src={profile.images[0].url} alt="Profile Image" />
      )}
      <ul>
        <li>User ID: {profile.id}</li>
        <li>Email: {profile.email}</li>
        <li>
          Spotify URI: <a href={profile.uri}>{profile.uri}</a>
        </li>
        <li>
          Link:{' '}
          <a href={profile.external_urls.spotify}>
            {profile.external_urls.spotify}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
