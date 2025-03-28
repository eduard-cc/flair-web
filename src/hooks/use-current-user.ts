import {useQuery} from '@tanstack/react-query';

import {User} from '@/types/user';
import {HttpError, api} from '@/utils/api';

export const useCurrentUser = ({skipFetch = false} = {}) => {
  const {
    data: currentUser,
    isPending,
    error,
  } = useQuery<User, HttpError>({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const response = await api.get('/users/me');
      return response.json();
    },
    enabled: !skipFetch,
    retry: false,
  });
  const isAuthenticated = !isPending && !!currentUser && !error;
  const isEmailVerified = !isPending && !!currentUser && !error && currentUser?.isEmailVerified;

  return {currentUser, isPending, isAuthenticated, isEmailVerified};
};
