import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from 'firebase/auth';
import {
  onAuthChange,
  loginWithEmail,
  registerWithEmail,
  loginWithGoogle,
  logoutUser,
  createUserProfile,
  getUserProfile,
} from '@/lib/firebase';

interface UserProfile {
  name: string;
  email: string;
  photoURL?: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loginGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        const profile = await getUserProfile(firebaseUser.uid);
        setUserProfile(profile as UserProfile | null);
      } else {
        setUserProfile(null);
      }
      
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    await loginWithEmail(email, password);
  };

  const register = async (name: string, email: string, password: string) => {
    const { user: newUser } = await registerWithEmail(email, password);
    
    if (newUser) {
      await createUserProfile(newUser.uid, {
        name,
        email,
        photoURL: newUser.photoURL || undefined,
      });
    }
  };

  const loginGoogle = async () => {
    const { user: googleUser } = await loginWithGoogle();
    
    if (googleUser) {
      const existingProfile = await getUserProfile(googleUser.uid);
      
      if (!existingProfile) {
        await createUserProfile(googleUser.uid, {
          name: googleUser.displayName || 'Usuário',
          email: googleUser.email || '',
          photoURL: googleUser.photoURL || undefined,
        });
      }
    }
  };

  const logout = async () => {
    await logoutUser();
  };

  const value: AuthContextType = {
    user,
    userProfile,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    loginGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
