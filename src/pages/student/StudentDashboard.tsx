
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, FileCheck, GraduationCap, Clock, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FeedbackForm from '@/components/ui-elements/FeedbackForm';
import { secureContent } from '@/utils/security';

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  React.useEffect(() => {
    // Apply security measures for protected content
    const cleanup = secureContent('.secure-content');
    return cleanup;
  }, []);

  const subjects = [
    {
      id: 'pharm-chem',
      name: 'Pharmaceutical Chemistry',
      progress: 65,
      topics: 18,
      completed: 12,
      nextTopic: 'Heterocyclic Compounds'
    },
    {
      id: 'pharmacology',
      name: 'Pharmacology',
      progress: 42,
      topics: 24,
      completed: 10,
      nextTopic: 'Autonomic Nervous System'
    },
    {
      id: 'pharma',
      name: 'Pharmaceutics',
      progress: 78,
      topics: 15,
      completed: 12,
      nextTopic: 'Solid Dosage Forms'
    },
    {
      id: 'pharm-analysis',
      name: 'Pharmaceutical Analysis',
      progress: 30,
      topics: 20,
      completed: 6,
      nextTopic: 'UV-Visible Spectroscopy'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
        <p className="text-muted-foreground">
          B.Pharm - Semester 4 (2023-24)
        </p>
      </div>

      <Card className="dashboard-card overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="p-6 md:w-2/3">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="flex items-center">
                  <h2 className="text-2xl font-bold">Current Semester</h2>
                  <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                </div>
                <p className="text-muted-foreground">Bachelor of Pharmacy - Semester 4</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span className="font-medium">54%</span>
              </div>
              <Progress value={54} className="h-2" />
            </div>
            
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span>Semester ends in 82 days</span>
            </div>
          </div>
          
          <div className="md:w-1/3 bg-gradient-to-br from-primary/10 to-blue-400/10 p-6">
            <h3 className="font-medium mb-2">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Courses</span>
                <span className="font-medium">6</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Completed Topics</span>
                <span className="font-medium">42/78</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Practical Sessions</span>
                <span className="font-medium">8/12</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div>
        <h2 className="text-xl font-semibold mb-4">My Subjects</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {subjects.map((subject) => (
            <Card 
              key={subject.id} 
              className="dashboard-card cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/student/courses/${subject.id}`)}
            >
              <CardHeader className="pb-2">
                <CardTitle>{subject.name}</CardTitle>
                <CardDescription>
                  {subject.completed} of {subject.topics} topics completed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>Next: </span>
                  <span className="ml-1 text-foreground">{subject.nextTopic}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Recent Learning Materials</CardTitle>
          <CardDescription>
            Access recently updated study content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="theory">Theory</TabsTrigger>
              <TabsTrigger value="practical">Practical</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {[
                { 
                  title: "Pharmaceutical Chemistry: Heterocyclic Compounds", 
                  type: "Lecture Notes",
                  date: "Updated 2 days ago",
                  completed: true,
                  subject: "Pharmaceutical Chemistry"
                },
                { 
                  title: "Pharmacodynamics: Dose-Response Relationships", 
                  type: "MCQ Set",
                  date: "Updated 3 days ago",
                  completed: false,
                  subject: "Pharmacology"
                },
                { 
                  title: "Practical: Tablet Formulation and Evaluation", 
                  type: "Lab Guide",
                  date: "Updated 5 days ago",
                  completed: false,
                  subject: "Pharmaceutics"
                },
                { 
                  title: "Spectroscopic Methods in Structure Elucidation", 
                  type: "Theory",
                  date: "Updated 1 week ago",
                  completed: false,
                  subject: "Pharmaceutical Analysis"
                }
              ].map((material, i) => (
                <div key={i} className="flex secure-content">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    {material.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <FileCheck className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                      <div>
                        <p className="font-medium">{material.title}</p>
                        <p className="text-xs text-muted-foreground">{material.subject} • {material.type}</p>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1 sm:mt-0">{material.date}</span>
                    </div>
                    <div className="mt-2">
                      <Button variant="outline" size="sm">
                        {material.completed ? 'Review Again' : 'Continue Learning'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="theory">
              <div className="py-6 text-center text-muted-foreground">
                Switch to the "All" tab to view combined content
              </div>
            </TabsContent>
            
            <TabsContent value="practical">
              <div className="py-6 text-center text-muted-foreground">
                Switch to the "All" tab to view combined content
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="hidden md:block">
        <FeedbackForm />
      </div>
      
      <div className="md:hidden">
        <FeedbackForm compact />
      </div>
    </div>
  );
};

export default StudentDashboard;
