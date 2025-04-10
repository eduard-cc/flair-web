import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useNavigate, useRouter} from '@tanstack/react-router';
import {toast} from 'sonner';

import {User} from '@/types/user';
import {HttpError, api} from '@/utils/api';

import {LogInDto} from '../types/login.dto';

type useLogInProps = {
  returnTo?: string;
};

export const useLogIn = ({returnTo}: useLogInProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const router = useRouter();

  const {mutate: logIn, isPending} = useMutation<User, HttpError, LogInDto>({
    mutationFn: async (logInDto: LogInDto) => {
      return await api.post<User>('/auth/login', JSON.stringify(logInDto));
    },
    onSuccess: (user) => {
      queryClient.setQueryData(['currentUser'], user);
      router.update({context: {isAuthenticated: true, isEmailVerified: user.isEmailVerified}});

      if (!user.isEmailVerified) {
        return navigate({to: '/verify'});
      }
      if (returnTo) {
        if (returnTo == '/verify') {
          toast.info('Your email has already been verified.');
        }
        return navigate({to: returnTo});
      }
      return navigate({to: '/home'});
    },
    onError: (error) => {
      if (error.status === 400) {
        return toast.error('Validation failed', {
          description: 'Please input a valid email and password.',
        });
      }
      if (error.status === 401) {
        throw error;
      }
    },
    retry: false,
  });
  return {logIn, isPending};
};
