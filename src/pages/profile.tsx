import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SpotifyArtist, UserProfile } from '../types';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import LogoutButton from '../app/components/LogoutButton';

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [topArtists, setTopArtists] = useState<SpotifyArtist[]>([]);
  const router = useRouter();
  const { token, loading } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      if (loading) return;
      if (!token) {
        router.push('/');
        return;
      }

      try {
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
          'https://api.spotify.com/v1/me/top/artists',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTopArtists(artistsResponse.data.items);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            router.push('/');
          }
        }
      }
    };

    fetchProfile();
  }, [router, token, loading]);

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>Loading...</div>;

  return (
    <div className="p-4 ">
      <div className="flex flex-col sm:flex-row justify-evenly items-center">
        <div className="flex flex-row items-center space-x-4">
          {profile.images.length > 0 && (
            <img
              className="rounded-full w-25 h-25 object-cover hidden sm:block"
              src={profile.images[0].url}
              alt="Profile Image"
            />
          )}
          <h1 className="text-xl font-bold sm:mb-0 mb-4 font-sourcecode">
            Logged in as {profile.display_name}
          </h1>
        </div>

        <a
          href={profile.uri}
          className="text-gray-900 mb-2 sm:mb-0 font-semibold font-firacode"
        >
          Open Spotify App
        </a>
        <a
          href={profile.external_urls.spotify}
          className="text-gray-900 mb-2 sm:mb-0 font-semibold font-firacode"
        >
          Open Spotify in your browser
        </a>
      </div>

      <div className="flex flex-row justify-between items-center mt-8 mb-4">
        <h2 className="text-xl font-semibold  font-sourcecode">Top Artists</h2>
        <LogoutButton />
      </div>

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
            <a
              href={artist.external_urls.spotify}
              className="text-gray-900 p-2 font-firacode"
            >
              Listen
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
