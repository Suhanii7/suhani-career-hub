
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
      <TabsList className="grid grid-cols-3">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="requirements">Requirements</TabsTrigger>
        <TabsTrigger value="benefits">Benefits</TabsTrigger>
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
    </Tabs>
  );
};

export default JobTabs;
