import {useMutation} from '@tanstack/react-query';
import {toast} from 'sonner';

import {HttpError, api} from '@/utils/api';

import {PasswordChangeDto} from '../types/password-change.dto';

export const useChangePassword = () => {
  const {mutateAsync: changePassword, isPending} = useMutation<void, HttpError, PasswordChangeDto>({
    mutationFn: async (dto) => {
      const response = await api.post('/auth/change-password', JSON.stringify(dto));
      return response.json();
    },
    onSuccess: () => {
      toast.success('Password changed.');
    },
  });

  return {changePassword, isPending};
};
