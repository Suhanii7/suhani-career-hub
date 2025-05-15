
import { Job } from "@/lib/types";

export const jobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechCorp",
    companyLogo: "https://via.placeholder.com/40",
    location: "New York, NY",
    type: "Full-time",
    salary: "$80,000 - $100,000",
    postedDate: "2023-04-15",
    deadline: "2023-05-15",
    description: "We are looking for an experienced Frontend Developer to join our team. The ideal candidate will have strong React and TypeScript skills, and experience with modern frontend frameworks.",
    requirements: [
      "3+ years experience with React",
      "Strong knowledge of TypeScript",
      "Experience with REST APIs",
      "Understanding of responsive design principles",
      "Bachelor's degree in Computer Science or related field"
    ],
    benefits: [
      "Competitive salary",
      "Healthcare benefits",
      "401k matching",
      "Flexible work schedule",
      "Remote work options"
    ],
    tags: ["React", "TypeScript", "Frontend", "JavaScript"],
    isUrgent: true
  },
  {
    id: "2",
    title: "Backend Engineer",
    company: "DataSystems",
    companyLogo: "https://via.placeholder.com/40",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$95,000 - $120,000",
    postedDate: "2023-04-10",
    deadline: "2023-05-10",
    description: "We're seeking a Backend Engineer with expertise in Node.js and database design. You'll be responsible for developing server-side logic, defining and maintaining databases, and ensuring high performance and responsiveness to requests from the front-end.",
    requirements: [
      "4+ years experience with Node.js",
      "Experience with SQL and NoSQL databases",
      "Knowledge of REST API design",
      "Understanding of server security and data protection",
      "BSc in Computer Science or relevant field"
    ],
    benefits: [
      "Competitive compensation",
      "Health, dental, and vision insurance",
      "Generous PTO policy",
      "Professional development stipend",
      "Home office stipend"
    ],
    tags: ["Node.js", "Express", "MongoDB", "SQL", "API"],
    isUrgent: false
  },
  {
    id: "3",
    title: "UX/UI Designer",
    company: "CreativeHub",
    companyLogo: "https://via.placeholder.com/40",
    location: "Remote",
    type: "Full-time",
    salary: "$70,000 - $90,000",
    postedDate: "2023-04-05",
    deadline: "2023-05-05",
    description: "We are looking for a talented UX/UI Designer to create amazing user experiences. The ideal candidate should have experience in delivering end-to-end UX/UI design for software products.",
    requirements: [
      "3+ years of experience in UX/UI design",
      "Proficiency in design tools like Figma or Adobe XD",
      "Portfolio demonstrating UI design and interaction",
      "Experience conducting user research and testing",
      "Understanding of accessibility standards"
    ],
    benefits: [
      "Flexible working hours",
      "Remote-first culture",
      "Health insurance",
      "Learning and development budget",
      "Team retreats"
    ],
    tags: ["UX", "UI", "Figma", "User Research", "Design"],
    isUrgent: false
  },
  {
    id: "4",
    title: "Full Stack Developer",
    company: "WebSolutions",
    companyLogo: "https://via.placeholder.com/40",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$85,000 - $110,000",
    postedDate: "2023-04-20",
    deadline: "2023-05-20",
    description: "We're looking for a Full Stack Developer who is passionate about building web applications from front to back. You should be comfortable working with both client and server-side technologies.",
    requirements: [
      "3+ years of full stack development experience",
      "Proficiency with React, Node.js, and SQL/NoSQL databases",
      "Experience with cloud services (AWS, Azure, or GCP)",
      "Knowledge of CI/CD pipelines",
      "Strong problem-solving skills"
    ],
    benefits: [
      "Competitive salary",
      "Comprehensive healthcare",
      "401(k) with company match",
      "Unlimited PTO",
      "Hybrid work model"
    ],
    tags: ["Full Stack", "React", "Node.js", "MongoDB", "AWS"],
    isUrgent: true
  },
  {
    id: "5",
    title: "DevOps Engineer",
    company: "CloudTech",
    companyLogo: "https://via.placeholder.com/40",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$90,000 - $115,000",
    postedDate: "2023-04-12",
    deadline: "2023-05-12",
    description: "We are seeking a DevOps Engineer to help us build and maintain our infrastructure. The ideal candidate will have experience with cloud platforms, CI/CD, and automation.",
    requirements: [
      "3+ years of DevOps experience",
      "Experience with AWS, Docker, and Kubernetes",
      "Knowledge of Infrastructure as Code (Terraform, CloudFormation)",
      "Experience with CI/CD pipelines",
      "Strong scripting skills (Bash, Python)"
    ],
    benefits: [
      "Competitive compensation package",
      "Health and wellness benefits",
      "Flexible work arrangements",
      "Professional development opportunities",
      "Company equity"
    ],
    tags: ["DevOps", "AWS", "Docker", "Kubernetes", "CI/CD"],
    isUrgent: false
  }
];

export const getJobById = (id: string): Job | undefined => {
  return jobs.find(job => job.id === id);
};
