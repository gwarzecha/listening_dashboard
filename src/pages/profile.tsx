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
          'https://api.spotify.com/v1/me/top/artists?limit=12',
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Logged in as {profile.display_name}
      </h1>
      {profile.images.length > 0 && (
        <img
          className="rounded-full w-32 h-32 object-cover"
          src={profile.images[0].url}
          alt="Profile Image"
        />
      )}
      <ul className="list-disc list-inside">
        <li>User ID: {profile.id}</li>
        <li>Email: {profile.email}</li>
        <li>
          Spotify URI:{' '}
          <a href={profile.uri} className="text-blue-500">
            {profile.uri}
          </a>
        </li>
        <li>
          Link:{' '}
          <a href={profile.external_urls.spotify} className="text-blue-500">
            {profile.external_urls.spotify}
          </a>
        </li>
      </ul>
      <h2 className="text-xl font-semibold mt-8">Top Artists</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topArtists.map((artist) => (
          <li key={artist.name} className="p-4 border rounded shadow">
            <h3 className="text-lg font-bold">{artist.name}</h3>
            {artist.images.length > 0 && (
              <img
                src={artist.images[1].url}
                alt={`${artist.name} Image`}
                className="w-32 h-32 object-cover rounded-full"
              />
            )}
            <p>Genres: {artist.genres.join(', ')}</p>
            <a href={artist.external_urls.spotify} className="text-blue-500">
              Listen on Spotify
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
