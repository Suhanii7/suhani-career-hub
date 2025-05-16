
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import JobCard from "@/components/JobCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { jobs } from "@/data/jobs";
import { toast } from "sonner";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobs.slice(0, 4));
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  
  // Job lists
  const featuredJobs = filteredJobs;
  const recentJobs = [...jobs].sort((a, b) => 
    new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
  ).slice(0, 3);
  
  const urgentJobs = jobs.filter(job => job.isUrgent);
  
  // Categories for quick filtering
  const categories = ["Remote", "Full-time", "Tech", "Marketing", "Finance"];
  
  // Filter jobs based on search query or category
  useEffect(() => {
    let results = [...jobs];
    
    // Filter by search query
    if (searchQuery) {
      results = results.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      results = results.filter(job => 
        job.type.toLowerCase() === selectedCategory.toLowerCase() || 
        job.tags.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase())
      );
    }
    
    setFilteredJobs(results.slice(0, 4));
  }, [searchQuery, selectedCategory]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      return;
    }
    
    // For real app, this would navigate to search results page
    toast.success(`Searching for "${searchQuery}" jobs`);
    
    // Navigate to jobs page with search parameter (placeholder - would be implemented later)
    // navigate(`/jobs?search=${encodeURIComponent(searchQuery)}`);
  };
  
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(prevCategory => prevCategory === category ? "" : category);
    toast.success(`Showing ${category} jobs`);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-800 to-primary-500 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Find Your Dream Job Today
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Discover thousands of job opportunities with all the information you need.
              </p>
              
              <form onSubmit={handleSearch} className="bg-white rounded-lg p-2 flex flex-col md:flex-row shadow-lg">
                <Input
                  placeholder="Job title, keywords, or company"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mb-2 md:mb-0 md:mr-2 flex-grow bg-transparent text-gray-900"
                />
                <Button 
                  type="submit" 
                  className="bg-primary-600 hover:bg-primary-700 text-white"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search Jobs
                </Button>
              </form>
              
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <Badge 
                    key={category}
                    variant="secondary" 
                    className={`${
                      selectedCategory === category 
                        ? "bg-white text-primary-700" 
                        : "bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
                    } cursor-pointer transition-all`}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Jobs Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">
                {selectedCategory ? `${selectedCategory} Jobs` : "Featured Jobs"}
                {searchQuery && ` matching "${searchQuery}"`}
              </h2>
              <Link to="/jobs">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary-100">
                  View all jobs
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJobs.length > 0 ? (
                filteredJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))
              ) : (
                <div className="col-span-2 text-center py-12">
                  <p className="text-lg text-gray-500">No jobs found matching your criteria.</p>
                  <Button 
                    className="mt-4 bg-primary hover:bg-primary-600"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("");
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Find and apply for your dream job in just a few simple steps.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center hover:transform hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  1
                </div>
                <h3 className="text-xl font-semibold mt-4">Create an Account</h3>
                <p className="text-gray-600 mt-2">
                  Sign up for a free account to get personalized job recommendations.
                </p>
              </div>
              
              <div className="text-center hover:transform hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  2
                </div>
                <h3 className="text-xl font-semibold mt-4">Search for Jobs</h3>
                <p className="text-gray-600 mt-2">
                  Browse thousands of jobs or use filters to find the perfect match.
                </p>
              </div>
              
              <div className="text-center hover:transform hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  3
                </div>
                <h3 className="text-xl font-semibold mt-4">Apply with Ease</h3>
                <p className="text-gray-600 mt-2">
                  Submit your application in minutes and track your application status.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Recent and Urgent Jobs Sections */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Jobs */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Recent Jobs</h2>
                <div className="space-y-4">
                  {recentJobs.map(job => (
                    <Link to={`/job/${job.id}`} key={job.id}>
                      <div className="bg-white rounded-lg p-4 border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex justify-between">
                          <div className="flex items-center space-x-3">
                            <img
                              src={job.companyLogo}
                              alt={`${job.company} logo`}
                              className="w-10 h-10 rounded-full bg-gray-100 object-cover"
                            />
                            <div>
                              <h3 className="font-semibold">{job.title}</h3>
                              <p className="text-sm text-gray-600">{job.company}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-gray-600">
                            {job.type}
                          </Badge>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Urgent Jobs */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Urgent Openings</h2>
                <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
                  {urgentJobs.map((job, index) => (
                    <div key={job.id}>
                      <Link to={`/job/${job.id}`}>
                        <div className="p-4 hover:bg-gray-50">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-semibold">{job.title}</h3>
                              <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
                            </div>
                            <Badge className="bg-red-500 text-white hover:bg-red-600 mt-1">
                              Urgent
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            Apply before {new Date(job.deadline).toLocaleDateString()}
                          </p>
                        </div>
                      </Link>
                      {index < urgentJobs.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Find Your Next Opportunity?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of job seekers who have found their dream jobs through Suhani Jobs Portal.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-gray-100"
                onClick={() => navigate("/jobs")}
              >
                Browse All Jobs
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary"
                onClick={() => navigate("/post-job")}
              >
                For Employers
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
