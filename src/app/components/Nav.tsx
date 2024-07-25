import { UserProfile } from '@/types';
import React from 'react';
import LogoutButton from './LogoutButton';
import NavMenu from './NavMenu';
import Image from 'next/image';

interface NavProps {
  profile: UserProfile;
}

const Nav: React.FC<NavProps> = ({ profile }) => {
  return (
    <nav className="fixed top-0 w-full nav-gradient p-4 flex flex-row justify-between items-center ">
      <div className="flex flex-row items-center space-x-4">
        {profile.images.length > 0 && (
          <Image
            className="hidden sm:block rounded-full w-10 h-10 object-cover"
            src={profile.images[0].url}
            alt="Profile Image"
            width={128}
            height={128}
          />
        )}
        <h1 className="text-xl font-semibold font-sourcecode text-gray-300">
          Logged in as {profile.display_name}
        </h1>
      </div>
      <div className=" flex-row space-x-12 items-center hidden lg:flex">
        <a
          href={profile.uri}
          className="text-gray-300 font-semibold font-firacode"
        >
          Open Spotify App
        </a>
        <a
          href={profile.external_urls.spotify}
          className="text-gray-300 font-semibold font-firacode"
        >
          Open Spotify in the browser
        </a>
      </div>
      <div className="flex flex-row space-x-6 items-center">
        <NavMenu />
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Nav;
