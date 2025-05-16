
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Job } from "@/lib/types";

interface JobTabsProps {
  job: Job;
}

const JobTabs = ({ job }: JobTabsProps) => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <Tabs defaultValue="description" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-4">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="requirements">Requirements</TabsTrigger>
        <TabsTrigger value="benefits">Benefits</TabsTrigger>
        <TabsTrigger value="howToApply">How to Apply</TabsTrigger>
      </TabsList>
      
      <TabsContent value="description" className="mt-4">
        <div className="prose max-w-none">
          <p className="whitespace-pre-line">{job.description}</p>
        </div>
      </TabsContent>
      
      <TabsContent value="requirements" className="mt-4">
        <ul className="list-disc pl-5 space-y-2">
          {job.requirements.map((requirement, index) => (
            <li key={index} className="text-gray-700">
              {requirement}
            </li>
          ))}
        </ul>
      </TabsContent>
      
      <TabsContent value="benefits" className="mt-4">
        <ul className="list-disc pl-5 space-y-2">
          {job.benefits.map((benefit, index) => (
            <li key={index} className="text-gray-700">
              {benefit}
            </li>
          ))}
        </ul>
      </TabsContent>
      
      <TabsContent value="howToApply" className="mt-4">
        <div className="prose max-w-none">
          <h3 className="text-lg font-medium text-gray-900">Application Process</h3>
          <p className="mt-2">
            To apply for this position, please fill out the application form on this page. 
            Make sure to upload your resume and include a cover letter if required.
          </p>
          <p className="mt-2">
            Our team will review your application and get back to you within 7-10 business days.
          </p>
          <h4 className="text-md font-medium text-gray-900 mt-4">Tips for a successful application:</h4>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Tailor your resume to highlight relevant experience</li>
            <li>Proofread your application before submission</li>
            <li>Research our company to demonstrate your interest</li>
            <li>Be honest about your qualifications and experience</li>
          </ul>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default JobTabs;
