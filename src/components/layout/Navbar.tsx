
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { LogIn, UserPlus, BookOpen, School, GraduationCap, FileText, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const { isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-border sticky top-0 z-40">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <a href="/" className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
            PharmLearn
          </a>
          
          <div className="hidden md:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">About</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/20 to-primary/5 p-6 no-underline outline-none focus:shadow-md"
                            href="/"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              PharmLearn
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              A comprehensive e-learning platform designed for pharmacy education
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/about" title="About Us" icon={<Info className="h-4 w-4" />}>
                        Learn about our mission and team
                      </ListItem>
                      <ListItem href="/features" title="Features" icon={<FileText className="h-4 w-4" />}>
                        Explore the platform's capabilities
                      </ListItem>
                      <ListItem href="/contact" title="Contact" icon={<Mail className="h-4 w-4" />}>
                        Get in touch with our support team
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <ListItem href="/students" title="For Students" icon={<GraduationCap className="h-4 w-4" />}>
                        Access course materials and practice exercises
                      </ListItem>
                      <ListItem href="/faculty" title="For Faculty" icon={<BookOpen className="h-4 w-4" />}>
                        Tools to manage and track student progress
                      </ListItem>
                      <ListItem href="/principals" title="For Principals" icon={<School className="h-4 w-4" />}>
                        Administrative tools for college management
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <a href="/blog" className={navigationMenuTriggerStyle()}>
                    Blog
                  </a>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <ThemeToggle />
          
          {isAuthenticated ? (
            <Button 
              variant="default" 
              onClick={() => navigate(`/${role}`)}
              className="hidden sm:flex"
            >
              Dashboard
            </Button>
          ) : (
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/signup')}
                className="hidden sm:flex items-center gap-2"
              >
                <UserPlus className="h-4 w-4" />
                Sign Up
              </Button>
              <Button 
                variant="default" 
                onClick={() => navigate('/#login-section')}
                className="flex items-center gap-2"
              >
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Sign In</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string;
  icon?: React.ReactNode;
}

const ListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(
  ({ className, title, icon, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="flex items-center gap-2 text-sm font-medium leading-none">
              {icon}
              {title}
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

export default Navbar;
