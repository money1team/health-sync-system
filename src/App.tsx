
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import PatientLayout from "./components/PatientLayout";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import PatientDetail from "./pages/PatientDetail";
import Appointments from "./pages/Appointments";
import MedicalRecords from "./pages/MedicalRecords";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import PatientDashboard from "./pages/patient/PatientDashboard";
import PatientAppointments from "./pages/patient/PatientAppointments";
import PatientRecords from "./pages/patient/PatientRecords";
import PatientProfile from "./pages/patient/PatientProfile";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import LogoutHandler from "./components/LogoutHandler";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Auth Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/logout" element={<LogoutHandler />} />
              
              {/* Staff/Doctor Routes */}
              <Route path="/staff" element={
                <ProtectedRoute requiredRole="staff">
                  <Layout />
                </ProtectedRoute>
              }>
                <Route index element={<Dashboard />} />
                <Route path="patients" element={<Patients />} />
                <Route path="patients/:id" element={<PatientDetail />} />
                <Route path="appointments" element={<Appointments />} />
                <Route path="medical-records" element={<MedicalRecords />} />
                <Route path="settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* Patient Routes */}
              <Route path="/" element={
                <ProtectedRoute requiredRole="patient">
                  <PatientLayout />
                </ProtectedRoute>
              }>
                <Route index element={<PatientDashboard />} />
                <Route path="appointments" element={<PatientAppointments />} />
                <Route path="records" element={<PatientRecords />} />
                <Route path="profile" element={<PatientProfile />} />
                <Route path="*" element={<NotFound />} />
              </Route>
              
              {/* Redirect to login if no match */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
