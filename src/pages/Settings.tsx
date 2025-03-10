import { useState } from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/ThemeContext";
import { MoonIcon, SunIcon, LaptopIcon } from "lucide-react";

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
});

const securityFormSchema = z.object({
  currentPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  newPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "New password and confirm password must match.",
  path: ["confirmPassword"],
});

const notificationItems = [
  {
    id: "appointments",
    label: "Appointment reminders",
  },
  {
    id: "patient-updates",
    label: "Patient updates",
  },
  {
    id: "system-updates",
    label: "System updates",
  },
  {
    id: "newsletters",
    label: "Monthly newsletters",
  },
];

const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [notificationMethods, setNotificationMethods] = useState({
    email: true,
    push: true,
    sms: false,
  });
  const [notificationPreferences, setNotificationPreferences] = useState({
    appointments: true,
    "patient-updates": true,
    "system-updates": true,
    newsletters: false,
  });
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [density, setDensity] = useState<"compact" | "comfortable">("comfortable");
  const { theme, setTheme } = useTheme();
  
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "Dr. Sarah Kimani",
      email: "sarah.kimani@example.com",
      phone: "(+254) 711-222-333",
    },
  });

  const securityForm = useForm<z.infer<typeof securityFormSchema>>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onProfileSubmit = (data: z.infer<typeof profileFormSchema>) => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const onSecuritySubmit = (data: z.infer<typeof securityFormSchema>) => {
    toast({
      title: "Password changed",
      description: "Your password has been changed successfully.",
    });
    securityForm.reset();
  };

  const onNotificationChange = (method: "email" | "push" | "sms", checked: boolean) => {
    setNotificationMethods((prev) => ({
      ...prev,
      [method]: checked,
    }));
    
    toast({
      title: `${method.charAt(0).toUpperCase() + method.slice(1)} notifications ${checked ? 'enabled' : 'disabled'}`,
      description: `You will ${checked ? 'now' : 'no longer'} receive notifications via ${method}.`,
    });
  };

  const onNotificationPreferenceChange = (id: string, checked: boolean) => {
    setNotificationPreferences(prev => ({
      ...prev,
      [id]: checked
    }));

    toast({
      title: `Preference updated`,
      description: `${checked ? 'Enabled' : 'Disabled'} notifications for ${id.replace('-', ' ')}.`,
    });
  };

  const onThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    toast({
      title: "Appearance updated",
      description: `Theme changed to ${newTheme}.`,
    });
  };

  const onDensityChange = (newDensity: "compact" | "comfortable") => {
    setDensity(newDensity);
    toast({
      title: "Density updated",
      description: `UI density changed to ${newDensity}.`,
    });
  };

  const onAnimationsChange = (enabled: boolean) => {
    setAnimationsEnabled(enabled);
    toast({
      title: `Animations ${enabled ? 'enabled' : 'disabled'}`,
      description: `UI animations have been ${enabled ? 'enabled' : 'disabled'}.`,
    });
  };

  const onNotificationsSubmit = () => {
    toast({
      title: "Notification preferences saved",
      description: "Your notification preferences have been updated successfully.",
    });
  };

  const onAppearanceSubmit = () => {
    toast({
      title: "Appearance preferences saved",
      description: "Your appearance preferences have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full sm:w-auto sm:inline-grid grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Update your profile information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form id="profile-form" onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                  <FormField
                    control={profileForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <Button type="submit" form="profile-form">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Notification Methods</h3>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch 
                      checked={notificationMethods.email} 
                      onCheckedChange={(checked) => onNotificationChange("email", checked)} 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via push notifications
                      </p>
                    </div>
                    <Switch 
                      checked={notificationMethods.push} 
                      onCheckedChange={(checked) => onNotificationChange("push", checked)} 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via SMS
                      </p>
                    </div>
                    <Switch 
                      checked={notificationMethods.sms} 
                      onCheckedChange={(checked) => onNotificationChange("sms", checked)} 
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Notification Preferences</h3>
                <div className="grid gap-2">
                  {notificationItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={item.id} 
                        checked={notificationPreferences[item.id as keyof typeof notificationPreferences]} 
                        onCheckedChange={(checked) => 
                          onNotificationPreferenceChange(item.id, checked === true)
                        }
                      />
                      <label
                        htmlFor={item.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={onNotificationsSubmit}>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Update your password and security settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...securityForm}>
                <form id="security-form" onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-4">
                  <FormField
                    control={securityForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={securityForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={securityForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <Button type="submit" form="security-form">Change Password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize the application appearance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Theme</h3>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    variant={theme === "light" ? "default" : "outline"} 
                    className="flex-1 gap-2"
                    onClick={() => onThemeChange("light")}
                  >
                    <SunIcon className="h-4 w-4" />
                    Light
                  </Button>
                  <Button 
                    variant={theme === "dark" ? "default" : "outline"} 
                    className="flex-1 gap-2"
                    onClick={() => onThemeChange("dark")}
                  >
                    <MoonIcon className="h-4 w-4" />
                    Dark
                  </Button>
                  <Button 
                    variant={theme === "system" ? "default" : "outline"} 
                    className="flex-1 gap-2"
                    onClick={() => onThemeChange("system")}
                  >
                    <LaptopIcon className="h-4 w-4" />
                    System
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Density</h3>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    variant={density === "compact" ? "default" : "outline"} 
                    className="flex-1"
                    onClick={() => onDensityChange("compact")}
                  >
                    Compact
                  </Button>
                  <Button 
                    variant={density === "comfortable" ? "default" : "outline"} 
                    className="flex-1"
                    onClick={() => onDensityChange("comfortable")}
                  >
                    Comfortable
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Animations</p>
                    <p className="text-sm text-muted-foreground">
                      Enable animations throughout the application
                    </p>
                  </div>
                  <Switch 
                    checked={animationsEnabled} 
                    onCheckedChange={onAnimationsChange} 
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={onAppearanceSubmit}>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
