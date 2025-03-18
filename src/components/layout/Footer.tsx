
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-card border-t border-border py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-sm text-muted-foreground">
              © {currentYear} PharmLearn. All rights reserved.
            </span>
          </div>
          
          <div className="flex space-x-6">
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Help & Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
