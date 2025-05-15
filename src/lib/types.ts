
export type Job = {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship" | "Remote";
  salary: string;
  postedDate: string;
  deadline: string;
  description: string;
  requirements: string[];
  benefits: string[];
  tags: string[];
  isUrgent: boolean;
};

export type JobApplication = {
  jobId: string;
  fullName: string;
  email: string;
  phone: string;
  resumeUrl: string;
  coverLetter?: string;
  status: "Submitted" | "Under Review" | "Interview" | "Rejected" | "Accepted";
};

export type User = {
  id: string;
  name: string;
  email: string;
  savedJobs: string[];
  applications: JobApplication[];
};
