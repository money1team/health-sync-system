
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MOCK_APPOINTMENTS, 
  getPatientById, 
  getDoctorById 
} from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

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

const RecentAppointments = () => {
  // Get the five most recent appointments
  const recentAppointments = [...MOCK_APPOINTMENTS]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Recent Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="hidden md:table-cell">Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentAppointments.map((appointment) => {
              const patient = getPatientById(appointment.patientId);
              const doctor = getDoctorById(appointment.doctorId);
              
              return (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">
                    <Link to={`/patients/${patient?.id}`} className="hover:text-health-600 hover:underline">
                      {patient?.name}
                    </Link>
                  </TableCell>
                  <TableCell>{doctor?.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{appointment.date}</TableCell>
                  <TableCell className="hidden md:table-cell">{appointment.time}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className="mt-4 flex justify-center">
          <Link 
            to="/appointments" 
            className="text-sm text-health-600 hover:text-health-800 hover:underline"
          >
            View all appointments
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentAppointments;
