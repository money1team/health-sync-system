
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

const PatientAppointments = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

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
                onSelect={setDate}
                className="rounded-md border"
              />
            </div>
            <Button className="w-full mt-4">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Book Appointment
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">General Checkup</p>
                  <p className="text-sm text-muted-foreground">Tomorrow at 9:00 AM</p>
                  <p className="text-sm text-muted-foreground">With Dr. Omondi</p>
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">Reschedule</Button>
                  <Button variant="destructive" size="sm">Cancel</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Dental Cleaning</p>
                  <p className="text-sm text-muted-foreground">Next Week, Tuesday at 2:00 PM</p>
                  <p className="text-sm text-muted-foreground">With Dr. Wanjiku</p>
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">Reschedule</Button>
                  <Button variant="destructive" size="sm">Cancel</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientAppointments;
