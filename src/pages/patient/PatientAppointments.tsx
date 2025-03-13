
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, RefreshCw, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import AppointmentBookingDialog from "@/components/AppointmentBookingDialog";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const PatientAppointments = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);
  const { toast } = useToast();

  // Mock appointments data
  const appointments = [
    {
      id: "1",
      title: "General Checkup",
      doctor: "Dr. Omondi",
      date: "Tomorrow",
      time: "9:00 AM"
    },
    {
      id: "2",
      title: "Dental Cleaning",
      doctor: "Dr. Wanjiku",
      date: "Next Week, Tuesday",
      time: "2:00 PM"
    }
  ];

  const handleReschedule = (id: string) => {
    setSelectedAppointmentId(id);
    setIsBookingOpen(true);
    toast({
      title: "Reschedule requested",
      description: "Your request to reschedule this appointment has been sent."
    });
  };

  const handleCancel = (id: string) => {
    // Find and remove the appointment from the list in a real application
    toast({
      title: "Appointment cancelled",
      description: "Your appointment has been cancelled successfully."
    });
  };

  const handleRefresh = () => {
    // In a real app, this would fetch the latest appointments
    toast({
      title: "Refreshed",
      description: "Your appointments have been refreshed."
    });
  };

  const handleBooking = () => {
    setSelectedAppointmentId(null); // Ensure we're creating a new appointment, not rescheduling
    setIsBookingOpen(true);
  };

  const handleCloseDialog = () => {
    setIsBookingOpen(false);
    setSelectedAppointmentId(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Appointments</h1>
        <p className="text-muted-foreground">
          Schedule and manage your appointments
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Schedule New Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => setDate(newDate)}
                className="rounded-md border"
              />
            </div>
            <Button 
              className="w-full mt-4"
              onClick={handleBooking}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              Book Appointment
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Upcoming Appointments</CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0"
                onClick={handleRefresh}
              >
                <RefreshCw className="h-4 w-4" />
                <span className="sr-only">Refresh</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {appointments.length > 0 ? (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <p className="font-medium">{appointment.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {appointment.date} at {appointment.time}
                      </p>
                      <p className="text-sm text-muted-foreground">{appointment.doctor}</p>
                    </div>
                    <div className="space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleReschedule(appointment.id)}
                      >
                        Reschedule
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleCancel(appointment.id)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No upcoming appointments</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <AppointmentBookingDialog
        isOpen={isBookingOpen}
        onClose={handleCloseDialog}
        selectedDate={date}
      />
    </div>
  );
};

export default PatientAppointments;
