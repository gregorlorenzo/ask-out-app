import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/authService';

export const useAuth = () => {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      authService.setToken(data.token);
      queryClient.invalidateQueries('user');
    },
  });

  const logout = () => {
    authService.logout();
    queryClient.invalidateQueries('user');
  };

  return {
    login: loginMutation.mutate,
    logout,
    isLoading: loginMutation.isLoading,
    error: loginMutation.error,
  };
};