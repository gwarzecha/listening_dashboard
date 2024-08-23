import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SpotifyArtist, UserProfile, SpotifyTrack } from '../types';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Image from 'next/image';
import Nav from '../app/components/Nav';
import LoadingSpinner from '@/app/components/LoadingSpinner';

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [topArtists, setTopArtists] = useState<SpotifyArtist[]>([]);
  const [topTracks, setTopTracks] = useState<SpotifyTrack[]>([]);

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
            params: {
              limit: 12,
            },
          }
        );
        setTopArtists(artistsResponse.data.items);

        const tracksResponse = await axios.get(
          'https://api.spotify.com/v1/me/top/tracks',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              limit: 10,
            },
          }
        );
        setTopTracks(tracksResponse.data.items);
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

  if (loading || !profile)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );

  return (
    <>
      <Nav profile={profile} />
      <div className="px-4 py-8">
        <h2 className="mt-20 mb-4 text-xl font-semibold font-sourcecode text-center sm:text-left">
          Top Artists
        </h2>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topArtists.map((artist) => (
            <li
              key={artist.id}
              className="p-4 rounded shadow-lg flex flex-col items-center"
            >
              <h3 className="text-lg font-bold font-inconsolata">
                {artist.name}
              </h3>
              {artist.images.length > 0 && (
                <Image
                  src={artist.images[1].url}
                  alt={`${artist.name} Spotify artist image`}
                  width={128}
                  height={128}
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

        <h2 className="mt-20 mb-4 text-xl font-semibold font-sourcecode text-center sm:text-left">
          Top Tracks
        </h2>
        <ul className="space-y-4">
          {topTracks.map((track, idx) => (
            <li
              key={track.id}
              className="flex flex-col sm:flex-row items-center text-center sm:space-x-3"
            >
              <h3 className="text-l font-semibold font-inconsolata">
                {idx + 1}.
              </h3>
              <h3 className="text-l font-semibold font-inconsolata">
                {track.name}
              </h3>
              <h3 className="sm:mb-0 mb-4 text-sm font-semibold font-firacode">
                {track.artists[0].name}
              </h3>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Profile;
