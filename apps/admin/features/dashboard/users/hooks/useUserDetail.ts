import { useQuery } from '@tanstack/react-query';
import { fetchMakerDetail } from '../model/makerApi';

export const useUserDetail = (nickname: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['user', nickname],
    queryFn: () => fetchMakerDetail(nickname),
    enabled: !!nickname,
  });

  return {
    user: data?.data,
    isLoading,
    error,
    refetch,
  };
};
