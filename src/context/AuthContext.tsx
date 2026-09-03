import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  userId: string;
  name: string;
  accountNumber: string;
  tier: string;
  role: string;
  clearanceLevel: string;
  email: string;
  phone: string;
  balance: number;
  lastLogin: string;
  twoFactorEnabled: boolean;
}

export interface DemoAccount {
  user: UserProfile;
  passwordHint: string;
  description: string;
  badgeTone: 'emerald' | 'cyan' | 'amber';
}

export const DEMO_ACCOUNTS: Record<string, DemoAccount> = {
  'deepak.sharma': {
    user: {
      id: 'usr-01',
      userId: 'deepak.sharma',
      name: 'Deepak Sharma',
      accountNumber: 'ACC #4912 · ELITE',
      tier: 'ELITE',
      role: 'Executive Client',
      clearanceLevel: 'Level 3 Sovereign Clearance',
      email: 'deepak.sharma@ascend.bank',
      phone: '+91 98450 12948',
      balance: 2845000,
      lastLogin: 'Today, 14:22 IST (Terminal 01)',
      twoFactorEnabled: true,
    },
    passwordHint: 'aegis2026',
    description: 'Executive retail banking client with high-value RTGS/UPI privileges.',
    badgeTone: 'emerald',
  },
  'priya.treasury': {
    user: {
      id: 'usr-02',
      userId: 'priya.treasury',
      name: 'Priya Nair',
      accountNumber: 'ACC #8821 · TREASURY',
      tier: 'CORPORATE',
      role: 'Treasury Officer',
      clearanceLevel: 'Multi-Sig Corporate Approver',
      email: 'priya.nair@chromastudios.com',
      phone: '+91 98200 48192',
      balance: 14500000,
      lastLogin: 'Today, 11:05 IST (Corporate Portal)',
      twoFactorEnabled: true,
    },
    passwordHint: 'aegis2026',
    description: 'Commercial corporate account manager managing vendor settlements.',
    badgeTone: 'cyan',
  },
  'vikram.admin': {
    user: {
      id: 'usr-03',
      userId: 'vikram.admin',
      name: 'Vikram Malhotra',
      accountNumber: 'ACC #1004 · COMPLIANCE',
      tier: 'RISK OFFICER',
      role: 'Chief Risk Officer',
      clearanceLevel: 'Full Fraud Forensic Override',
      email: 'vikram.malhotra@sentinel.ai',
      phone: '+91 99100 37190',
      balance: 5210000,
      lastLogin: 'Today, 09:30 IST (Risk Station)',
      twoFactorEnabled: true,
    },
    passwordHint: 'aegis2026',
    description: 'Fraud & AML forensic investigator with live intercept telemetry clearance.',
    badgeTone: 'amber',
  },
};

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (userId: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  switchDemoAccount: (userId: string) => void;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  isProfileDrawerOpen: boolean;
  openProfileDrawer: () => void;
  closeProfileDrawer: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with Deepak Sharma for instant seamless demonstration
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('aegis_auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEMO_ACCOUNTS['deepak.sharma'].user;
      }
    }
    return DEMO_ACCOUNTS['deepak.sharma'].user;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('aegis_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('aegis_auth_user');
    }
  }, [user]);

  const login = async (userId: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const normalizedId = userId.trim().toLowerCase();
    const demo = DEMO_ACCOUNTS[normalizedId];

    // Artificial cryptographic authentication delay (400ms) for high-end feel
    await new Promise((resolve) => setTimeout(resolve, 400));

    if (!demo) {
      return {
        success: false,
        error: `User ID "${userId}" not found. Please use one of the demo accounts below or check spelling.`,
      };
    }

    if (password !== demo.passwordHint && password !== 'aegis2026' && password !== 'password') {
      return {
        success: false,
        error: 'Invalid password. (Hint: use "aegis2026" or click a demo account below)',
      };
    }

    setUser(demo.user);
    setIsAuthModalOpen(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setIsProfileDrawerOpen(false);
  };

  const switchDemoAccount = (demoUserId: string) => {
    const demo = DEMO_ACCOUNTS[demoUserId];
    if (demo) {
      setUser(demo.user);
      setIsAuthModalOpen(false);
      setIsProfileDrawerOpen(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        switchDemoAccount,
        isAuthModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false),
        isProfileDrawerOpen,
        openProfileDrawer: () => setIsProfileDrawerOpen(true),
        closeProfileDrawer: () => setIsProfileDrawerOpen(false),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
