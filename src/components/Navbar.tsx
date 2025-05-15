
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary-700">Suhani</span>
              <span className="text-2xl font-bold ml-1 text-primary">Jobs Portal</span>
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <Link to="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary">
              Home
            </Link>
            <Link to="/jobs" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary">
              Browse Jobs
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/saved-jobs" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary">
                  Saved Jobs
                </Link>
                <Link to="/applications" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary">
                  My Applications
                </Link>
                <div className="relative ml-3 flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">
                    Hi, {user?.name.split(' ')[0]}
                  </span>
                  <Button 
                    variant="outline"
                    onClick={logout}
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-primary hover:bg-primary-600 text-white">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center sm:hidden">
            {/* Mobile menu button would go here */}
            <Button variant="ghost">
              <span className="sr-only">Open main menu</span>
              {/* Add menu icon */}
              ☰
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu would go here */}
    </nav>
  );
};

export default Navbar;
