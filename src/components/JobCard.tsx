
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Job } from "@/lib/types";
import { useAuth } from "@/contexts/AuthContext";

interface JobCardProps {
  job: Job;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  
  // Calculate days difference
  const diffTime = Math.abs(today.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString();
  }
};

const JobCard = ({ job }: JobCardProps) => {
  const { isAuthenticated, isJobSaved, saveJob, unsaveJob } = useAuth();
  const saved = isJobSaved(job.id);

  const handleSaveToggle = () => {
    if (saved) {
      unsaveJob(job.id);
    } else {
      saveJob(job.id);
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={job.companyLogo}
                alt={`${job.company} logo`}
                className="w-10 h-10 rounded-full bg-gray-100"
              />
              <div>
                <h3 className="text-lg font-semibold">
                  <Link to={`/job/${job.id}`} className="hover:text-primary">
                    {job.title}
                  </Link>
                </h3>
                <p className="text-sm text-gray-600">{job.company}</p>
              </div>
            </div>
            
            {isAuthenticated && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSaveToggle}
                className="text-gray-500 hover:text-primary"
              >
                {saved ? (
                  <BookmarkCheck className="w-5 h-5 text-primary" />
                ) : (
                  <Bookmark className="w-5 h-5" />
                )}
              </Button>
            )}
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="text-gray-600">
              {job.location}
            </Badge>
            <Badge variant="outline" className="text-gray-600">
              {job.type}
            </Badge>
            <Badge variant="outline" className="text-gray-600">
              {job.salary}
            </Badge>
            
            {job.isUrgent && (
              <Badge className="bg-red-500 text-white hover:bg-red-600">
                Urgent
              </Badge>
            )}
          </div>
          
          <div className="mt-4 flex flex-wrap gap-1">
            {job.tags.slice(0, 3).map(tag => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-primary-100 text-primary-700"
              >
                {tag}
              </Badge>
            ))}
            {job.tags.length > 3 && (
              <Badge
                variant="secondary"
                className="bg-gray-100 text-gray-700"
              >
                +{job.tags.length - 3}
              </Badge>
            )}
          </div>
          
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Posted {formatDate(job.postedDate)}
            </p>
            <Link to={`/job/${job.id}`}>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary-600 text-white"
              >
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
