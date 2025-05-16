
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Job } from "@/lib/types";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

interface JobCardProps {
  job: Job;
}

// Job category images
const categoryImages = {
  "Tech": "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&auto=format&fit=crop&q=60",
  "Marketing": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop&q=60",
  "Finance": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=60",
  "Remote": "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&auto=format&fit=crop&q=60",
  "Engineering": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&auto=format&fit=crop&q=60",
  "AI": "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600&auto=format&fit=crop&q=60",
  "Default": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=60",
};

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
  const [imageLoaded, setImageLoaded] = useState(false);
  const saved = isJobSaved(job.id);

  const handleSaveToggle = () => {
    if (saved) {
      unsaveJob(job.id);
    } else {
      saveJob(job.id);
    }
  };

  // Find appropriate image based on job tags or type
  const getJobImage = () => {
    // First check if any tags match our categories
    const matchingTag = job.tags.find(tag => categoryImages[tag as keyof typeof categoryImages]);
    
    if (matchingTag) {
      return categoryImages[matchingTag as keyof typeof categoryImages];
    }
    
    // If no tag matches, check job type
    if (job.type && categoryImages[job.type as keyof typeof categoryImages]) {
      return categoryImages[job.type as keyof typeof categoryImages];
    }
    
    // Default image if nothing matches
    return categoryImages.Default;
  };

  return (
    <Card className="hover:shadow-md transition-shadow overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                {job.companyLogo ? (
                  <img
                    src={job.companyLogo}
                    alt={`${job.company} logo`}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setImageLoaded(true)}
                  />
                ) : (
                  <img
                    src={getJobImage()}
                    alt={job.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
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
