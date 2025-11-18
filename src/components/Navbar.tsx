import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { HeartHandshake, LogOut, User, LayoutDashboard } from "lucide-react";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2">
          <HeartHandshake className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-foreground">Helpmate</span>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/board">
                <Button variant={location.pathname === "/board" ? "default" : "ghost"}>
                  Help Board
                </Button>
              </Link>
              {user.role === "admin" && (
                <Link to="/admin">
                  <Button variant={location.pathname === "/admin" ? "default" : "ghost"}>
                    <LayoutDashboard className="h-4 w-4" />
                  </Button>
                </Link>
              )}
              <Link to="/profile">
                <Button variant={location.pathname === "/profile" ? "default" : "ghost"}>
                  <User className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" onClick={logout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button>Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
