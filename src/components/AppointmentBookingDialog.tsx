
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { getDoctorById, MOCK_DOCTORS } from "@/lib/mock-data";

interface AppointmentBookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | undefined;
  appointmentId?: string | null;
}

const AppointmentBookingDialog = ({
  isOpen,
  onClose,
  selectedDate,
  appointmentId,
}: AppointmentBookingDialogProps) => {
  const { toast } = useToast();
  const [doctorId, setDoctorId] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Reset form when dialog opens for a new appointment
  useEffect(() => {
    if (isOpen) {
      if (!appointmentId) {
        // New appointment - reset form
        resetForm();
      } else {
        // Rescheduling - could pre-fill form based on appointment ID
        // In a real app, you would fetch the appointment details
        setDoctorId(MOCK_DOCTORS[0].id); // Just setting a default for demo
        setTime("10:00 AM");
        setReason("Follow-up appointment");
      }
    }
  }, [isOpen, appointmentId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !doctorId || !time || !reason) {
      toast({
        title: "Missing information",
        description: "Please fill out all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      let successMessage = appointmentId 
        ? "Your appointment has been rescheduled" 
        : "Your appointment has been scheduled";
        
      toast({
        title: appointmentId ? "Appointment rescheduled" : "Appointment booked",
        description: `${successMessage} for ${format(selectedDate, "PPP")} at ${time}`,
      });
      setIsSubmitting(false);
      resetForm();
      onClose();
    }, 1000);
  };

  const resetForm = () => {
    setDoctorId("");
    setTime("");
    setReason("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{appointmentId ? "Reschedule Appointment" : "Book New Appointment"}</DialogTitle>
          <DialogDescription>
            {selectedDate 
              ? `${appointmentId ? "Rescheduling" : "Booking"} for ${format(selectedDate, "PPP")}` 
              : "Select a date to book your appointment"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <label htmlFor="doctor" className="text-sm font-medium">Doctor</label>
            <Select value={doctorId} onValueChange={setDoctorId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a doctor" />
              </SelectTrigger>
              <SelectContent>
                {MOCK_DOCTORS.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="time" className="text-sm font-medium">Time</label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger>
                <SelectValue placeholder="Select a time" />
              </SelectTrigger>
              <SelectContent>
                {["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"].map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="reason" className="text-sm font-medium">Reason for Visit</label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Briefly describe your symptoms or reason for visit"
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                resetForm();
                onClose();
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 
                (appointmentId ? "Rescheduling..." : "Booking...") : 
                (appointmentId ? "Reschedule Appointment" : "Book Appointment")
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentBookingDialog;
