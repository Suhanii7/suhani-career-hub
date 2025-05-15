
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Suhani Jobs Portal</h3>
            <p className="text-sm text-gray-300">
              Connecting talented professionals with their dream careers. Find your next opportunity today.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">For Job Seekers</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/jobs" className="text-sm text-gray-300 hover:text-white">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/saved-jobs" className="text-sm text-gray-300 hover:text-white">
                  Saved Jobs
                </Link>
              </li>
              <li>
                <Link to="/applications" className="text-sm text-gray-300 hover:text-white">
                  Application Status
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-sm text-gray-300 hover:text-white">
                  Career Resources
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">For Employers</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/post-job" className="text-sm text-gray-300 hover:text-white">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-gray-300 hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/employer-resources" className="text-sm text-gray-300 hover:text-white">
                  Employer Resources
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Contact Us</h4>
            <address className="not-italic text-sm text-gray-300">
              <p>1234 Career Avenue</p>
              <p>New York, NY 10001</p>
              <p className="mt-2">Email: info@suhanijobs.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-300">© {new Date().getFullYear()} Suhani Jobs Portal. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/terms" className="text-sm text-gray-300 hover:text-white">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-sm text-gray-300 hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/about" className="text-sm text-gray-300 hover:text-white">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
