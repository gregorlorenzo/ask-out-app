import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/authService';
import { useNavigate } from '@tanstack/react-router';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      authService.setToken(data.token);
      queryClient.invalidateQueries('user');
      navigate({ to: '/dashboard' });
    },
  });

  const logout = () => {
    authService.logout();
    queryClient.invalidateQueries('user');
    navigate({ to: '/' });
  };

  return {
    login: loginMutation.mutate,
    logout,
    isLoading: loginMutation.isLoading,
    error: loginMutation.error,
  };
};