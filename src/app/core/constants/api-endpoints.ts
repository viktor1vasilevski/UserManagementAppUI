export const ApiEndpoints = {
  Auth: {
    Login: 'auth/login',
    Register: 'auth/register',
  },
  User: {
    Base: 'user',
    ById: (id: string) => `user/${id}`,
  },
};
