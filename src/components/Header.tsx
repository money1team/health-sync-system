
import { useState } from 'react';
import { Bell, Menu, User, Search, Calendar, ClipboardCheck, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Link } from 'react-router-dom';

const Header = () => {
  const isMobile = useIsMobile();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  return (
    <header className="border-b bg-background py-3 px-4 md:px-6 flex items-center justify-between h-16">
      {isMobile && (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[300px]">
            <div className="flex flex-col gap-6 h-full">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-health-500">
                  <path d="M19.5 12.577a7.5 7.5 0 0 0-7.5-12.074h-0c-5.068 0-8.212 5.236-5.788 9.852l13.276 19.645 0 0c2.172-1.462 4.018-3.327 5.073-5.49 0 0-5.06-11.932-5.06-11.933Z"></path>
                </svg>
                <span className="font-bold text-lg">HealthSync</span>
              </div>
              
              <nav className="flex flex-col gap-1">
                <Link to="/" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="9" y1="21" x2="9" y2="9"></line>
                  </svg>
                  Dashboard
                </Link>
                <Link to="/patients" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  Patients
                </Link>
                <Link to="/appointments" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  Appointments
                </Link>
                <Link to="/records" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <line x1="10" y1="9" x2="8" y2="9"></line>
                  </svg>
                  Medical Records
                </Link>
                <Link to="/settings" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  Settings
                </Link>
              </nav>
              
              <div className="mt-auto">
                <Button variant="outline" className="w-full justify-start">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Logout
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}

      <div className="flex-1 flex justify-end md:justify-between gap-4 items-center">
        <div className={`${isSearchOpen ? 'flex' : 'hidden'} md:flex w-full max-w-md relative`}>
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients, appointments..."
            className="pl-8"
          />
        </div>
        
        {isMobile && !isSearchOpen && (
          <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
            <Search className="h-5 w-5" />
          </Button>
        )}

        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-health-500 text-[10px] font-medium text-white">3</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Notifications</h4>
                  <Button variant="ghost" size="sm" className="text-xs">Mark all as read</Button>
                </div>
                <div className="space-y-2">
                  <div className="flex gap-2 rounded-lg p-2 hover:bg-muted cursor-pointer">
                    <div className="h-8 w-8 rounded-full bg-health-100 flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-health-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">New appointment scheduled</p>
                      <p className="text-xs text-muted-foreground">30 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex gap-2 rounded-lg p-2 hover:bg-muted cursor-pointer">
                    <div className="h-8 w-8 rounded-full bg-health-100 flex items-center justify-center">
                      <User className="h-4 w-4 text-health-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">New patient registered</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex gap-2 rounded-lg p-2 hover:bg-muted cursor-pointer">
                    <div className="h-8 w-8 rounded-full bg-health-100 flex items-center justify-center">
                      <ClipboardCheck className="h-4 w-4 text-health-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">Medical record updated</p>
                      <p className="text-xs text-muted-foreground">Yesterday</p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">View all notifications</Button>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative rounded-full">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-health-100 text-health-700">DR</AvatarFallback>
                </Avatar>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-health-100 text-health-700">DR</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Dr. Sarah Johnson</p>
                    <p className="text-xs text-muted-foreground">sarah.johnson@example.com</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                    <Link to="/profile">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                    <Link to="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-destructive hover:text-destructive" asChild>
                    <Link to="/logout">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Link>
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
};

export default Header;
