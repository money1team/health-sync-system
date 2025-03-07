
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  ClipboardList, 
  FilePlus, 
  ChevronLeft, 
  Info, 
  FileEdit,
  Activity,
  Pill
} from "lucide-react";
import { 
  getPatientById, 
  getAppointmentsForPatient, 
  getMedicalRecordsForPatient 
} from "@/lib/mock-data";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const PatientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const patient = getPatientById(id || "");
  
  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold mb-4">Patient Not Found</h1>
        <p className="mb-6">The patient you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/patients">Return to Patients</Link>
        </Button>
      </div>
    );
  }
  
  const appointments = getAppointmentsForPatient(patient.id);
  const medicalRecords = getMedicalRecordsForPatient(patient.id);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link to="/patients">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">{patient.name}</h1>
        <Badge className="ml-2">{`ID: ${patient.id}`}</Badge>
      </div>
      
      <div className="flex flex-wrap gap-4">
        <Button variant="outline" className="gap-2">
          <Calendar className="h-4 w-4" />
          Schedule Appointment
        </Button>
        <Button variant="outline" className="gap-2">
          <ClipboardList className="h-4 w-4" />
          View Medical Records
        </Button>
        <Button variant="outline" className="gap-2">
          <FilePlus className="h-4 w-4" />
          Add Medical Record
        </Button>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 md:grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="records">Medical Records</TabsTrigger>
          <TabsTrigger value="prescriptions" className="hidden md:inline-flex">Prescriptions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Patient Information</CardTitle>
                <Button variant="ghost" size="sm" className="gap-1">
                  <FileEdit className="h-4 w-4" />
                  Edit
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Age</p>
                    <p>{patient.age} years</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Gender</p>
                    <p>{patient.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p>{patient.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                    <p>{patient.phone}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm font-medium text-muted-foreground">Address</p>
                    <p>{patient.address}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Insurance #</p>
                    <p>{patient.insuranceNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Blood Type</p>
                    <p>{patient.bloodType}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Health Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Allergies</h3>
                  {patient.allergies.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {patient.allergies.map((allergy, index) => (
                        <Badge key={index} variant="outline" className="bg-red-50 text-red-800 border-red-200">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm">No known allergies</p>
                  )}
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Conditions</h3>
                  {patient.conditions.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {patient.conditions.map((condition, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm">No known conditions</p>
                  )}
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Last Visit</h3>
                  <p>{new Date(patient.lastVisit).toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 h-8 w-8 rounded-full bg-health-100 flex items-center justify-center text-health-600">
                      <Activity className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Vital signs measured</p>
                      <p className="text-sm text-muted-foreground">BP: 120/80, HR: 72, Temp: 98.6°F</p>
                      <p className="text-xs text-muted-foreground">Yesterday at 2:30 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="mt-1 h-8 w-8 rounded-full bg-health-100 flex items-center justify-center text-health-600">
                      <Pill className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Prescription updated</p>
                      <p className="text-sm text-muted-foreground">Lisinopril 10mg - Once daily</p>
                      <p className="text-xs text-muted-foreground">3 days ago at 10:15 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="mt-1 h-8 w-8 rounded-full bg-health-100 flex items-center justify-center text-health-600">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Appointment completed</p>
                      <p className="text-sm text-muted-foreground">Annual checkup with Dr. Johnson</p>
                      <p className="text-xs text-muted-foreground">1 week ago at 9:00 AM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Appointment History</CardTitle>
              <CardDescription>View and manage patient's appointments</CardDescription>
            </CardHeader>
            <CardContent>
              {appointments.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead className="hidden md:table-cell">Reason</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Doctor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell>{appointment.date}</TableCell>
                        <TableCell>{appointment.time}</TableCell>
                        <TableCell className="hidden md:table-cell">{appointment.reason}</TableCell>
                        <TableCell>
                          <Badge 
                            className={appointment.status === 'Scheduled' 
                              ? 'bg-blue-100 text-blue-800' 
                              : appointment.status === 'Completed' 
                              ? 'bg-green-100 text-green-800' 
                              : appointment.status === 'Cancelled' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-yellow-100 text-yellow-800'
                            }
                          >
                            {appointment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>Dr. Johnson</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No appointments found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="records">
          <Card>
            <CardHeader>
              <CardTitle>Medical Records</CardTitle>
              <CardDescription>Complete medical history</CardDescription>
            </CardHeader>
            <CardContent>
              {medicalRecords.length > 0 ? (
                <div className="space-y-4">
                  {medicalRecords.map((record) => (
                    <Card key={record.id} className="overflow-hidden">
                      <CardHeader className="bg-muted/50 p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <CardTitle className="text-lg font-medium">
                            {record.diagnosis}
                          </CardTitle>
                          <div className="text-sm text-muted-foreground">
                            {new Date(record.date).toLocaleDateString()}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground mb-1">Treatment</h3>
                            <p>{record.treatment}</p>
                          </div>
                          
                          {record.prescription && (
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground mb-1">Prescription</h3>
                              <ul className="list-disc pl-5 space-y-1">
                                {record.prescription.map((prescription, index) => (
                                  <li key={index} className="text-sm">
                                    {prescription.medication} - {prescription.dosage}, {prescription.frequency} for {prescription.duration}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {record.notes && (
                            <div className="md:col-span-2">
                              <h3 className="text-sm font-medium text-muted-foreground mb-1">Notes</h3>
                              <p className="text-sm">{record.notes}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No medical records found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="prescriptions">
          <Card>
            <CardHeader>
              <CardTitle>Current Prescriptions</CardTitle>
              <CardDescription>Active medication list</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <Info className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                  <p className="mb-2">Prescription data will be displayed here</p>
                  <p className="text-sm text-muted-foreground">Coming soon in a future update</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientDetail;
