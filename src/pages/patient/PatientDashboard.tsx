
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ClipboardList, Bell } from "lucide-react";
import { Link } from "react-router-dom";

const PatientDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome Back, Kamau</h1>
        <p className="text-muted-foreground">
          View your medical information and manage your appointments
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Tomorrow</div>
            <p className="text-xs text-muted-foreground">9:00 AM with Dr. Omondi</p>
            <Button asChild className="mt-4 w-full">
              <Link to="/appointments">View Appointments</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Records</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 Updates</div>
            <p className="text-xs text-muted-foreground">Last updated 2 days ago</p>
            <Button asChild className="mt-4 w-full">
              <Link to="/records">View Records</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2 New</div>
            <p className="text-xs text-muted-foreground">Prescription reminders</p>
            <Button variant="outline" className="mt-4 w-full">View All</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="font-medium">General Checkup</p>
                  <p className="text-sm text-muted-foreground">Tomorrow at 9:00 AM</p>
                </div>
                <Button variant="outline" size="sm">Reschedule</Button>
              </div>
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="font-medium">Dental Cleaning</p>
                  <p className="text-sm text-muted-foreground">Next Week, Tuesday at 2:00 PM</p>
                </div>
                <Button variant="outline" size="sm">Reschedule</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Medical Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-medium">Blood Test Results</p>
                <p className="text-sm text-muted-foreground">Added 2 days ago</p>
              </div>
              <div>
                <p className="font-medium">X-Ray Report</p>
                <p className="text-sm text-muted-foreground">Added 1 week ago</p>
              </div>
              <div>
                <p className="font-medium">Vaccination Record</p>
                <p className="text-sm text-muted-foreground">Added 2 weeks ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientDashboard;
