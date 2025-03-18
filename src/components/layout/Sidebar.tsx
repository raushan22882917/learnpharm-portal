
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  BookOpen, 
  Settings, 
  BarChart2, 
  School, 
  GraduationCap, 
  ClipboardList, 
  LogOut, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleSidebar }) => {
  const { role, logout } = useAuth();
  const location = useLocation();
  
  // Role-based navigation items
  const getNavItems = () => {
    switch (role) {
      case 'admin':
        return [
          { path: '/admin', icon: <Home size={20} />, label: 'Dashboard' },
          { path: '/admin/colleges', icon: <School size={20} />, label: 'Colleges' },
          { path: '/admin/users', icon: <Users size={20} />, label: 'Users' },
          { path: '/admin/content', icon: <BookOpen size={20} />, label: 'Content' },
          { path: '/admin/analytics', icon: <BarChart2 size={20} />, label: 'Analytics' },
          { path: '/admin/settings', icon: <Settings size={20} />, label: 'Settings' },
        ];
      case 'principal':
        return [
          { path: '/principal', icon: <Home size={20} />, label: 'Dashboard' },
          { path: '/principal/college', icon: <School size={20} />, label: 'College' },
          { path: '/principal/faculty', icon: <Users size={20} />, label: 'Faculty' },
          { path: '/principal/students', icon: <GraduationCap size={20} />, label: 'Students' },
          { path: '/principal/feedback', icon: <ClipboardList size={20} />, label: 'Feedback' },
        ];
      case 'faculty':
        return [
          { path: '/faculty', icon: <Home size={20} />, label: 'Dashboard' },
          { path: '/faculty/students', icon: <GraduationCap size={20} />, label: 'Students' },
          { path: '/faculty/content', icon: <BookOpen size={20} />, label: 'Content' },
          { path: '/faculty/feedback', icon: <ClipboardList size={20} />, label: 'Feedback' },
        ];
      case 'student':
        return [
          { path: '/student', icon: <Home size={20} />, label: 'Dashboard' },
          { path: '/student/courses', icon: <BookOpen size={20} />, label: 'My Courses' },
          { path: '/student/practical', icon: <ClipboardList size={20} />, label: 'Practical' },
          { path: '/student/feedback', icon: <ClipboardList size={20} />, label: 'Feedback' },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <aside 
      className={cn(
        "app-sidebar",
        collapsed && "collapsed",
        "transition-all duration-300 ease-in-out"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-16 px-4 border-b">
          {!collapsed && (
            <span className="font-semibold text-gradient">
              PharmLearn
            </span>
          )}
          <button 
            onClick={toggleSidebar}
            className={cn(
              "p-2 rounded-full hover:bg-secondary transition-colors",
              collapsed ? "mx-auto" : ""
            )}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-foreground hover:bg-secondary",
                collapsed ? "justify-center" : "justify-start"
              )}
            >
              <span className={cn(collapsed ? "" : "mr-3")}>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={logout}
            className={cn(
              "flex items-center px-3 py-2 text-sm rounded-md text-destructive hover:bg-destructive/10 transition-colors w-full",
              collapsed ? "justify-center" : "justify-start"
            )}
          >
            <LogOut size={20} className={cn(collapsed ? "" : "mr-3")} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
