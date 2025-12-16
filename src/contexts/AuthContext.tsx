import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ManufacturerUser, Recycler, UserRole, hasPermission, Permission } from '@/lib/mockData';

type UserType = 'manufacturer' | 'recycler' | null;

interface AuthUser {
  type: UserType;
  manufacturerUser?: ManufacturerUser;
  recycler?: Recycler;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  userType: UserType;
  login: (type: UserType, userData: ManufacturerUser | Recycler) => void;
  logout: () => void;
  hasPermission: (permission: Permission) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (type: UserType, userData: ManufacturerUser | Recycler) => {
    if (type === 'manufacturer') {
      setUser({ type, manufacturerUser: userData as ManufacturerUser });
    } else if (type === 'recycler') {
      setUser({ type, recycler: userData as Recycler });
    }
  };

  const logout = () => {
    setUser(null);
  };

  const checkPermission = (permission: Permission): boolean => {
    if (!user || user.type !== 'manufacturer' || !user.manufacturerUser) {
      return false;
    }
    return hasPermission(user.manufacturerUser.role as UserRole, permission);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        userType: user?.type || null,
        login,
        logout,
        hasPermission: checkPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
