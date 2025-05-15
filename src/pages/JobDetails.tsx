
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import JobTabs from "@/components/JobTabs";
import ApplicationForm from "@/components/ApplicationForm";
import { getJobById } from "@/data/jobs";
import { Job } from "@/lib/types";
import { useAuth } from "@/contexts/AuthContext";

const JobDetails = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated, isJobSaved, saveJob, unsaveJob } = useAuth();
  
  useEffect(() => {
    if (!jobId) {
      navigate("/jobs");
      return;
    }
    
    // In a real app, this would be an API call
    const foundJob = getJobById(jobId);
    
    if (foundJob) {
      setJob(foundJob);
    } else {
      toast.error("Job not found");
      navigate("/jobs");
    }
    
    setLoading(false);
  }, [jobId, navigate]);
  
  const handleSaveToggle = () => {
    if (!job) return;
    
    if (isJobSaved(job.id)) {
      unsaveJob(job.id);
      toast.success("Job removed from saved jobs");
    } else {
      saveJob(job.id);
      toast.success("Job saved successfully");
    }
  };
  
  const handleShare = () => {
    const url = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: job?.title,
        text: `Check out this job: ${job?.title} at ${job?.company}`,
        url: url,
      });
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  
  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Job not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Job Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={job.companyLogo}
                  alt={`${job.company} logo`}
                  className="w-16 h-16 rounded-lg bg-gray-100"
                />
                <div>
                  <h1 className="text-2xl font-bold">{job.title}</h1>
                  <p className="text-lg text-gray-600">{job.company}</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                {isAuthenticated && (
                  <Button
                    variant="outline"
                    onClick={handleSaveToggle}
                    className="border-primary text-primary hover:bg-primary-100"
                  >
                    {isJobSaved(job.id) ? (
                      <>
                        <BookmarkCheck className="w-5 h-5 mr-2" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-5 h-5 mr-2" />
                        Save
                      </>
                    )}
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </Button>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{job.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Job Type</p>
                  <p className="font-medium">{job.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Salary</p>
                  <p className="font-medium">{job.salary}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Deadline</p>
                  <p className="font-medium">
                    {new Date(job.deadline).toLocaleDateString()}
                    {job.isUrgent && (
                      <Badge className="ml-2 bg-red-500 text-white hover:bg-red-600">
                        Urgent
                      </Badge>
                    )}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-2">
              {job.tags.map(tag => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-primary-100 text-primary-700"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Job Content Tabs */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <JobTabs job={job} />
          </div>
        </div>
        
        {/* Sidebar - Application Form */}
        <div className="md:col-span-1 space-y-4">
          {isAuthenticated ? (
            <ApplicationForm jobId={job.id} jobTitle={job.title} />
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 text-center">
              <h3 className="text-lg font-semibold mb-4">Apply for {job.title}</h3>
              <p className="text-gray-600 mb-6">
                Please login to apply for this job.
              </p>
              <Button 
                className="w-full bg-primary hover:bg-primary-600"
                onClick={() => navigate("/login")}
              >
                Login to Apply
              </Button>
              <Separator className="my-6" />
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <span 
                  className="text-primary hover:text-primary-600 cursor-pointer"
                  onClick={() => navigate("/register")}
                >
                  Register
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
