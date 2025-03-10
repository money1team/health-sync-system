
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { HeartPulse } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (role: 'patient' | 'staff') => {
    setIsSubmitting(true);
    try {
      const success = await login(email, password, role);
      if (success) {
        // Redirect to the appropriate dashboard
        navigate(role === 'staff' ? '/staff' : '/');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-2">
            <HeartPulse className="h-12 w-12 text-health-500" />
          </div>
          <CardTitle className="text-2xl">HealthSync</CardTitle>
          <CardDescription>Login to access your health portal</CardDescription>
        </CardHeader>
        <Tabs defaultValue="patient" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="patient">Patient</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
          </TabsList>
          <TabsContent value="patient">
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="patient-email">Email</Label>
                <Input 
                  id="patient-email"
                  type="email"
                  placeholder="kamau@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="patient-password">Password</Label>
                <Input 
                  id="patient-password" 
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => handleLogin('patient')}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login as Patient"}
              </Button>
            </CardFooter>
          </TabsContent>
          <TabsContent value="staff">
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="staff-email">Email</Label>
                <Input 
                  id="staff-email"
                  type="email"
                  placeholder="sarah@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="staff-password">Password</Label>
                <Input 
                  id="staff-password" 
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => handleLogin('staff')}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login as Staff"}
              </Button>
            </CardFooter>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default LoginPage;
