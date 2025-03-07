
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CalendarClock, Activity, Clipboard } from "lucide-react";
import { Stat } from "@/lib/types";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentAppointments from "@/components/dashboard/RecentAppointments";
import PatientsDemographics from "@/components/dashboard/PatientsDemographics";
import { MOCK_PATIENTS, MOCK_APPOINTMENTS } from "@/lib/mock-data";

const Dashboard = () => {
  const stats: Stat[] = [
    {
      label: "Total Patients",
      value: MOCK_PATIENTS.length,
      change: 12,
      icon: <Users className="h-4 w-4" />,
    },
    {
      label: "Appointments Today",
      value: MOCK_APPOINTMENTS.filter(app => app.date === "2023-10-15").length,
      change: 5,
      icon: <CalendarClock className="h-4 w-4" />,
    },
    {
      label: "Patient Visits",
      value: "230",
      change: -2,
      icon: <Activity className="h-4 w-4" />,
    },
    {
      label: "Medical Records",
      value: "1,205",
      change: 8,
      icon: <Clipboard className="h-4 w-4" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Here's an overview of your health system.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatsCard key={index} stat={stat} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <RecentAppointments />
        <PatientsDemographics />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center">
            <p className="text-muted-foreground">Activity chart will be displayed here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
