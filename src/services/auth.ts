interface User {
    email: string;
  }
  
  export const login = (email: string): User => {
    const user = { email };
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  };
  
  export const logout = (): void => {
    localStorage.removeItem('user');
  };
  
  export const getCurrentUser = (): User | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  };