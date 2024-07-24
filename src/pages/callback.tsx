import { useRouter } from 'next/router';
import { useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Callback = () => {
  const router = useRouter();
  const { setToken } = useAuth();

  useEffect(() => {
    const fetchAccessToken = async (code: string) => {
      try {
        const response = await axios.post('/api/getAccessToken', { code });
        if (response.status === 200) {
          const { accessToken } = response.data;
          localStorage.setItem('spotifyAccessToken', accessToken);
          setToken(accessToken);
          router.push('/profile');
        }
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    const { code } = router.query;
    if (code) fetchAccessToken(code as string);
  }, [router, setToken]);

  return <div>Loading...</div>;
};

export default Callback;
