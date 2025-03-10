
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Calendar, 
  ClipboardList, 
  User,
  LogOut,
  HeartPulse 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const PatientSidebar = () => {
  const location = useLocation();
  
  const routes = [
    {
      name: 'Dashboard',
      path: '/',
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: 'Appointments',
      path: '/appointments',
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      name: 'Medical Records',
      path: '/records',
      icon: <ClipboardList className="h-5 w-5" />,
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: <User className="h-5 w-5" />,
    },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 border-r bg-sidebar text-sidebar-foreground">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <HeartPulse className="h-8 w-8 text-health-500" />
          <span className="font-bold text-xl">Patient Portal</span>
        </div>
        
        <nav className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className={cn(
                'flex items-center px-3 py-2 rounded-md transition-colors text-sm font-medium',
                location.pathname === route.path
                  ? 'bg-health-100 text-health-700'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )}
            >
              {route.icon}
              <span className="ml-3">{route.name}</span>
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto p-6">
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link to="/logout" className="text-sidebar-foreground">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Link>
        </Button>
      </div>
    </aside>
  );
};

export default PatientSidebar;
