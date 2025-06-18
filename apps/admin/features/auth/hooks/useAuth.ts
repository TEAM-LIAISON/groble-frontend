import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchMe, logout } from '../api/authApi';

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['me'],
    queryFn: fetchMe,
  });

  const handleLogout = async () => {
    try {
      await logout();
      queryClient.invalidateQueries({ queryKey: ['me'] });
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return {
    nickname: data?.nickname,
    isLoading,
    error,
    isLoggedIn: data?.isLogin === true,
    logout: handleLogout,
  };
};
