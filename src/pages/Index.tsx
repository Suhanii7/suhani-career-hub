
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import JobCard from "@/components/JobCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { jobs } from "@/data/jobs";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const featuredJobs = jobs.slice(0, 4);
  const recentJobs = [...jobs].sort((a, b) => 
    new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
  ).slice(0, 3);
  
  const urgentJobs = jobs.filter(job => job.isUrgent);
  
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
              
              <div className="bg-white rounded-lg p-2 flex flex-col md:flex-row shadow-lg">
                <Input
                  placeholder="Job title, keywords, or company"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mb-2 md:mb-0 md:mr-2 flex-grow bg-transparent text-gray-900"
                />
                <Button className="bg-primary-600 hover:bg-primary-700 text-white">
                  Search Jobs
                </Button>
              </div>
              
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white">
                  Remote
                </Badge>
                <Badge variant="secondary" className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white">
                  Full-time
                </Badge>
                <Badge variant="secondary" className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white">
                  Tech
                </Badge>
                <Badge variant="secondary" className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white">
                  Marketing
                </Badge>
                <Badge variant="secondary" className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white">
                  Finance
                </Badge>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Jobs Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Featured Jobs</h2>
              <Link to="/jobs">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary-100">
                  View all jobs
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
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
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  1
                </div>
                <h3 className="text-xl font-semibold mt-4">Create an Account</h3>
                <p className="text-gray-600 mt-2">
                  Sign up for a free account to get personalized job recommendations.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  2
                </div>
                <h3 className="text-xl font-semibold mt-4">Search for Jobs</h3>
                <p className="text-gray-600 mt-2">
                  Browse thousands of jobs or use filters to find the perfect match.
                </p>
              </div>
              
              <div className="text-center">
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
                              className="w-10 h-10 rounded-full bg-gray-100"
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
              >
                Browse All Jobs
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary"
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
