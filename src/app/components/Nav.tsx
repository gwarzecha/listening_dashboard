import { UserProfile } from '@/types';
import React from 'react';
import LogoutButton from './LogoutButton';

interface NavProps {
  profile: UserProfile;
}

const Nav: React.FC<NavProps> = ({ profile }) => {
  return (
    <nav className="fixed top-0 w-full nav-gradient p-4 flex flex-row justify-between items-center ">
      <div className="flex flex-row items-center space-x-4">
        {profile.images.length > 0 && (
          <img
            className="hidden sm:block rounded-full w-10 h-10 object-cover"
            src={profile.images[0].url}
            alt="Profile Image"
          />
        )}
        <h1 className="text-xl font-bold font-sourcecode text-white">
          Logged in as {profile.display_name}
        </h1>
      </div>
      <div className="flex flex-row space-x-8 items-center">
        <a
          href={profile.uri}
          className="text-white font-semibold font-firacode"
        >
          Spotify App
        </a>
        <a
          href={profile.external_urls.spotify}
          className="text-white font-semibold font-firacode"
        >
          Spotify browser
        </a>
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Nav;
