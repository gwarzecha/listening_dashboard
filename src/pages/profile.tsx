import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SpotifyArtist, UserProfile } from '../types';

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [topArtists, setTopArtists] = useState<SpotifyArtist[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('spotifyAccessToken');
      if (token) {
        const profileResponse = await axios.get(
          'https://api.spotify.com/v1/me',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfile(profileResponse.data);

        const artistsResponse = await axios.get(
          'https://api.spotify.com/v1/me/top/artists?limit=10',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTopArtists(artistsResponse.data.items);
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
      <h2>Top Artists</h2>
      <ul>
        {topArtists.map((artist) => (
          <li key={artist.name}>
            <h3>{artist.name}</h3>
            {artist.images.length > 0 && (
              <img src={artist.images[1].url} alt={`${artist.name} Image`} />
            )}
            <p>Genres: {artist.genres.join(', ')}</p>
            <a href={artist.external_urls.spotify}>Listen on Spotify</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
