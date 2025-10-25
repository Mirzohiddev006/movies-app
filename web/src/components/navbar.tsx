import { NavLink, Link } from "react-router-dom";
import { Film, LogIn, UserPlus } from "lucide-react";
import { Button } from "./ui";

export const Navbar = () => {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/movies" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
          <div className="bg-primary flex size-10 items-center justify-center rounded-lg">
            <Film className="text-primary-foreground size-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">Movies App</span>
        </Link>

        <div className="flex items-center gap-2">
          <NavLink to="/auth/login">
            {({ isActive }) => (
              <Button variant={isActive ? "default" : "ghost"} size="sm">
                <LogIn className="mr-2 size-4" />
                Kirish
              </Button>
            )}
          </NavLink>
          <NavLink to="/auth/register">
            {({ isActive }) => (
              <Button variant={isActive ? "default" : "ghost"} size="sm">
                <UserPlus className="mr-2 size-4" />
                Ro'yxatdan o'tish
              </Button>
            )}
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;