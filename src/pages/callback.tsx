import { useRouter } from 'next/router';
import { useEffect } from 'react';
import axios from 'axios';

const Callback = () => {
  const router = useRouter();

  useEffect(() => {
    const fetchAccessToken = async (code: string) => {
      try {
        const response = await axios.post('/api/getAccessToken', { code });
        if (response.status === 200) {
          const { accessToken } = response.data;
          // Store the access token in local storage or context
          localStorage.setItem('spotifyAccessToken', accessToken);
          router.push('/profile');
        }
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    const { code } = router.query;
    if (code) fetchAccessToken(code as string);
  }, [router]);

  return <div>Loading...</div>;
};

export default Callback;
