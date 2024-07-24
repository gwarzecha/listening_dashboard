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
    <div className="p-4 bg-gray-500">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold mb-4 font-sourcecode">
          Logged in as {profile.display_name}
        </h1>
        {profile.images.length > 0 && (
          <img
            className="rounded-full w-32 h-32 object-cover"
            src={profile.images[0].url}
            alt="Profile Image"
          />
        )}
      </div>

      <ul className="list-disc list-inside">
        <li>
          <a href={profile.uri} className="text-blue-500">
            Open Spotify App
          </a>
        </li>
        <li>
          <a href={profile.external_urls.spotify} className="text-blue-500">
            Open Spotify in the browser
          </a>
        </li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 font-sourcecode">
        Top Artists
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topArtists.map((artist) => (
          <li
            key={artist.name}
            className="p-4 border rounded shadow flex flex-col items-center"
          >
            <h3 className="text-lg font-bold font-inconsolata">
              {artist.name}
            </h3>
            {artist.images.length > 0 && (
              <img
                src={artist.images[1].url}
                alt={`${artist.name} Image`}
                className="w-32 h-32 object-cover rounded-full"
              />
            )}

            <a href={artist.external_urls.spotify} className="text-blue-500">
              Listen
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
