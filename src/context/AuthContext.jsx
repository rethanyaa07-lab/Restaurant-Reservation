
import {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("restaurantUser");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  // Save or remove the current user
  useEffect(() => {
    if (user) {
      localStorage.setItem("restaurantUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("restaurantUser");
    }
  }, [user]);

  // Login using an existing account
  const login = (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return {
        success: false,
        message: "Please enter your email and password."
      };
    }

    try {
      const accounts = JSON.parse(
        localStorage.getItem("restaurantAccounts") || "[]"
      );

      const account = accounts.find(
        (item) =>
          item.email.toLowerCase() === normalizedEmail &&
          item.password === password
      );

      if (!account) {
        return {
          success: false,
          message: "Invalid email or password."
        };
      }

      const loggedInUser = {
        id: account.id,
        name: account.name,
        email: account.email
      };

      setUser(loggedInUser);

      return {
        success: true,
        user: loggedInUser,
        message: "Login successful."
      };
    } catch {
      return {
        success: false,
        message: "Unable to read account information."
      };
    }
  };

  // Create a new account
  const signup = (name, email, password) => {
    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedName || !normalizedEmail || !password) {
      return {
        success: false,
        message: "Please fill in all fields."
      };
    }

    if (!/^[a-zA-Z\s]{2,50}$/.test(normalizedName)) {
      return {
        success: false,
        message: "Enter a valid name."
      };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return {
        success: false,
        message: "Enter a valid email address."
      };
    }

    if (password.length < 6) {
      return {
        success: false,
        message: "Password must contain at least 6 characters."
      };
    }

    try {
      const accounts = JSON.parse(
        localStorage.getItem("restaurantAccounts") || "[]"
      );

      if (!Array.isArray(accounts)) {
        return {
          success: false,
          message: "Account data is invalid."
        };
      }

      const existingAccount = accounts.find(
        (item) => item.email.toLowerCase() === normalizedEmail
      );

      if (existingAccount) {
        return {
          success: false,
          message: "An account with this email already exists."
        };
      }

      const newAccount = {
        id: crypto.randomUUID(),
        name: normalizedName,
        email: normalizedEmail,
        password
      };

      localStorage.setItem(
        "restaurantAccounts",
        JSON.stringify([...accounts, newAccount])
      );

      const loggedInUser = {
        id: newAccount.id,
        name: newAccount.name,
        email: newAccount.email
      };

      setUser(loggedInUser);

      return {
        success: true,
        user: loggedInUser,
        message: "Account created successfully."
      };
    } catch {
      return {
        success: false,
        message: "Unable to create your account."
      };
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom authentication hook
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}

export default AuthContext;
