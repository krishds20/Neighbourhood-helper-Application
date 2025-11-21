import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (name: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Seed a demo user and some demo help requests if they don't exist yet
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const demoEmail = "user1@gmail.com";
      const demoId = "user1-id";
      const adminEmail = "admin@admin.com";
      const adminId = "admin-id";

      if (!users.some((u: any) => u.email === demoEmail)) {
        users.push({
          id: demoId,
          email: demoEmail,
          password: "user1",
          name: "user1",
          role: "user",
        });
        localStorage.setItem("users", JSON.stringify(users));
      }

      if (!users.some((u: any) => u.email === adminEmail)) {
        users.push({
          id: adminId,
          email: adminEmail,
          password: "admin",
          name: "admin",
          role: "admin",
        });
        localStorage.setItem("users", JSON.stringify(users));
      }

      const helpRequests = JSON.parse(localStorage.getItem("helpRequests") || "[]");
      if (!helpRequests || helpRequests.length === 0) {
        const now = new Date().toISOString();
        const demoRequests = [
          {
            id: "req-1",
            title: "Grocery pickup for elderly neighbour",
            description: "Need someone to pick up groceries from the nearby store.",
            category: "Shopping",
            status: "active",
            requesterId: demoId,
            requesterName: "user1",
            createdAt: now,
          },
          {
            id: "req-2",
            title: "Help setting up a router",
            description: "Router needs basic configuration and Wi-Fi setup.",
            category: "Technology Help",
            status: "active",
            requesterId: demoId,
            requesterName: "user1",
            createdAt: now,
          },
          {
            id: "req-3",
            title: "Walk my dog for 30 minutes",
            description: "Looking for someone to walk my dog in the evenings.",
            category: "Pet Care",
            status: "active",
            requesterId: demoId,
            requesterName: "user1",
            createdAt: now,
          },
          {
            id: "req-4",
            title: "Assist moving a small sofa",
            description: "Need two people to help move a small sofa across the hallway.",
            category: "Moving Help",
            status: "active",
            requesterId: demoId,
            requesterName: "user1",
            createdAt: now,
          },
        ];
        localStorage.setItem("helpRequests", JSON.stringify(demoRequests));
      }
    } catch (e) {
      // ignore storage errors in environments where localStorage isn't available
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    if (users.some((u: any) => u.email === email)) {
      return false;
    }

    const newUser = {
      id: crypto.randomUUID(),
      email,
      password,
      name,
      role: "user" as const,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  const updateProfile = (name: string) => {
    if (user) {
      const updatedUser = { ...user, name };
      setUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = users.map((u: any) => 
        u.id === user.id ? { ...u, name } : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
