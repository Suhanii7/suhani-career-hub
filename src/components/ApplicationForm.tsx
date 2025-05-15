
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface ApplicationFormProps {
  jobId: string;
  jobTitle: string;
}

const ApplicationForm = ({ jobId, jobTitle }: ApplicationFormProps) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  
  // Form validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    
    if (!resumeFile) {
      newErrors.resume = "Resume is required";
    } else {
      const fileExt = resumeFile.name.split('.').pop()?.toLowerCase();
      if (!["pdf", "docx", "doc"].includes(fileExt || "")) {
        newErrors.resume = "Resume must be PDF, DOC, or DOCX";
      } else if (resumeFile.size > 5 * 1024 * 1024) {
        newErrors.resume = "Resume must be less than 5MB";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real app, this would be an API call to submit the application
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessDialog(true);
      toast.success("Application submitted successfully!");
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold mb-4">Apply for {jobTitle}</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input 
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            className={errors.fullName ? "border-red-500" : ""}
          />
          {errors.fullName && (
            <p className="text-sm text-red-500">{errors.fullName}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="johndoe@example.com"
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input 
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(123) 456-7890"
            className={errors.phone ? "border-red-500" : ""}
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="resume">Resume (PDF, DOC, DOCX, max 5MB)</Label>
          <Input 
            id="resume"
            type="file"
            onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
            accept=".pdf,.doc,.docx"
            className={errors.resume ? "border-red-500" : ""}
          />
          {errors.resume && (
            <p className="text-sm text-red-500">{errors.resume}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="coverLetter">Cover Letter (Optional)</Label>
          <Textarea 
            id="coverLetter"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            placeholder="Tell us why you're a great fit for this role..."
            rows={5}
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      </form>
      
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Application Submitted!</DialogTitle>
            <DialogDescription>
              Your application for {jobTitle} has been successfully submitted. You can track the status of your application in the "My Applications" section.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              onClick={() => setShowSuccessDialog(false)}
              className="bg-primary hover:bg-primary-600"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplicationForm;
