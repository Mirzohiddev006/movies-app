import { NavLink, Link } from "react-router-dom";

export const Navbar = () => (
  <header className="w-full border-b ">
    <nav className="container mx-auto flex items-center justify-between py-4 w-[90%]">
      <Link to="/movies">
      <span className="text-2xl font-bold tracking-tight">Movies App</span>
      </Link>
      <ul className="flex items-center space-x-4">
        <li>
          <NavLink to="/auth/login" className={({ isActive }) => (isActive ? "text-primary" : "text-gray-500")}>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/auth/register" className={({ isActive }) => (isActive ? "text-primary" : "text-gray-500")}>
            Register
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
);
