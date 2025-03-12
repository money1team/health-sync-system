import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  PlusCircle, 
  Search, 
  MoreHorizontal, 
  CheckCircle, 
  XCircle, 
  Edit, 
  CalendarClock,
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { MOCK_APPOINTMENTS, getPatientById, getDoctorById } from "@/lib/mock-data";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, startOfWeek, endOfWeek } from "date-fns";
import AppointmentCreationDialog from "@/components/AppointmentCreationDialog";
import { Appointment } from "@/lib/types";
import { cn } from "@/lib/utils";

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Scheduled':
      return 'bg-blue-100 text-blue-800';
    case 'Completed':
      return 'bg-green-100 text-green-800';
    case 'Cancelled':
      return 'bg-red-100 text-red-800';
    case 'No-show':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const Appointments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isCreationDialogOpen, setIsCreationDialogOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { toast } = useToast();
  
  const filteredAppointments = MOCK_APPOINTMENTS.filter((appointment) => {
    const patient = getPatientById(appointment.patientId);
    const doctor = getDoctorById(appointment.doctorId);
    
    const matchesSearch = 
      patient?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      false;
    
    const matchesDate = date 
      ? appointment.date === format(date, 'yyyy-MM-dd')
      : true;
    
    return matchesSearch && matchesDate;
  });

  const handleStatusChange = (appointmentId: string, newStatus: string) => {
    toast({
      title: "Appointment Updated",
      description: `Appointment status changed to ${newStatus}`,
    });
  };

  const getAppointmentsForDay = (day: Date): Appointment[] => {
    const dateString = format(day, 'yyyy-MM-dd');
    return MOCK_APPOINTMENTS.filter(appointment => appointment.date === dateString);
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const CalendarHeader = () => (
    <div className="flex items-center justify-between px-2 py-4">
      <h3 className="font-semibold">{format(currentMonth, 'MMMM yyyy')}</h3>
      <div className="flex space-x-2">
        <Button variant="outline" size="icon" onClick={prevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={nextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground">
            Manage and schedule patient appointments
          </p>
        </div>
        <Button onClick={() => setIsCreationDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Appointment
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="w-full sm:flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search appointments..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto justify-start">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : 'Pick a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          {date && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setDate(undefined)}
              className="shrink-0"
            >
              <XCircle className="h-4 w-4" />
            </Button>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="shrink-0">
                <ChevronDown className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>All Appointments</DropdownMenuItem>
              <DropdownMenuItem>Today</DropdownMenuItem>
              <DropdownMenuItem>This Week</DropdownMenuItem>
              <DropdownMenuItem>This Month</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Scheduled</DropdownMenuItem>
              <DropdownMenuItem>Completed</DropdownMenuItem>
              <DropdownMenuItem>Cancelled</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <Tabs defaultValue="list">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="hidden md:table-cell">Time</TableHead>
                    <TableHead className="hidden lg:table-cell">Doctor</TableHead>
                    <TableHead className="hidden md:table-cell">Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((appointment) => {
                    const patient = getPatientById(appointment.patientId);
                    const doctor = getDoctorById(appointment.doctorId);
                    
                    return (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">
                          <Link 
                            to={`/patients/${patient?.id}`} 
                            className="hover:text-health-600 hover:underline"
                          >
                            {patient?.name}
                          </Link>
                        </TableCell>
                        <TableCell>{appointment.date}</TableCell>
                        <TableCell className="hidden md:table-cell">{appointment.time}</TableCell>
                        <TableCell className="hidden lg:table-cell">{doctor?.name}</TableCell>
                        <TableCell className="hidden md:table-cell">{appointment.reason}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <CalendarClock className="mr-2 h-4 w-4" />
                                Reschedule
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(appointment.id, "Completed")}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Mark as Completed
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Details
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-destructive"
                                onClick={() => handleStatusChange(appointment.id, "Cancelled")}
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                Cancel Appointment
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              
              {filteredAppointments.length === 0 && (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No appointments found</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </TabsContent>
        
        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Appointments Calendar</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="border rounded-md overflow-hidden">
                <CalendarHeader />
                <div className="grid grid-cols-7 gap-0">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div 
                      key={day} 
                      className="text-center p-2 font-medium text-sm text-muted-foreground border-b"
                    >
                      {day}
                    </div>
                  ))}
                  
                  {eachDayOfInterval({
                    start: startOfWeek(startOfMonth(currentMonth)),
                    end: endOfWeek(endOfMonth(currentMonth))
                  }).map((day) => {
                    const dayAppointments = getAppointmentsForDay(day);
                    const isCurrentMonth = isSameMonth(day, currentMonth);
                    const isToday = isSameDay(day, new Date());
                    
                    return (
                      <div 
                        key={day.toString()}
                        className={cn(
                          "min-h-[100px] p-1 border hover:bg-accent/20 transition-colors",
                          !isCurrentMonth && "bg-muted/20 text-muted-foreground",
                          isToday && "bg-accent/10"
                        )}
                        onClick={() => {
                          setDate(day);
                          setIsCreationDialogOpen(true);
                        }}
                      >
                        <div className="flex flex-col h-full">
                          <div className={cn(
                            "self-end h-6 w-6 rounded-full flex items-center justify-center text-xs mb-1",
                            isToday && "bg-primary text-primary-foreground font-semibold"
                          )}>
                            {format(day, 'd')}
                          </div>
                          <div className="flex-1 overflow-y-auto">
                            {dayAppointments.slice(0, 3).map((apt, i) => (
                              <div 
                                key={i}
                                className="text-xs p-1 mb-1 rounded truncate bg-accent/30 border-l-2 border-primary"
                                title={`${getPatientById(apt.patientId)?.name} - ${apt.reason}`}
                              >
                                {getPatientById(apt.patientId)?.name?.split(' ')[0]} - {apt.time}
                              </div>
                            ))}
                            {dayAppointments.length > 3 && (
                              <div className="text-xs text-muted-foreground p-1">
                                +{dayAppointments.length - 3} more
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <AppointmentCreationDialog 
        isOpen={isCreationDialogOpen}
        onClose={() => setIsCreationDialogOpen(false)}
        onSuccess={() => {
          toast({
            title: "Success",
            description: "Appointment has been scheduled successfully",
          });
        }}
      />
    </div>
  );
};

export default Appointments;
