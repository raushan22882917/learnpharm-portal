
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Search, BookOpen, ClipboardList, Medal, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const StudentCourses: React.FC = () => {
  const subjects = [
    {
      id: 'pharm-chem',
      name: 'Pharmaceutical Chemistry',
      progress: 65,
      topics: 18,
      completed: 12,
      nextTopic: 'Heterocyclic Compounds',
      type: 'theory'
    },
    {
      id: 'pharmacology',
      name: 'Pharmacology',
      progress: 42,
      topics: 24,
      completed: 10,
      nextTopic: 'Autonomic Nervous System',
      type: 'theory'
    },
    {
      id: 'pharma',
      name: 'Pharmaceutics',
      progress: 78,
      topics: 15,
      completed: 12,
      nextTopic: 'Solid Dosage Forms',
      type: 'theory'
    },
    {
      id: 'pharm-analysis',
      name: 'Pharmaceutical Analysis',
      progress: 30,
      topics: 20,
      completed: 6,
      nextTopic: 'UV-Visible Spectroscopy',
      type: 'theory'
    },
    {
      id: 'pharm-chem-lab',
      name: 'Pharmaceutical Chemistry Lab',
      progress: 60,
      topics: 10,
      completed: 6,
      nextTopic: 'Organic Compound Synthesis',
      type: 'practical'
    },
    {
      id: 'pharma-lab',
      name: 'Pharmaceutics Lab',
      progress: 40,
      topics: 8,
      completed: 3,
      nextTopic: 'Tablet Formulation',
      type: 'practical'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
          <p className="text-muted-foreground">
            Explore your enrolled subjects for this semester
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search subjects..."
            className="pl-8 w-full"
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-3 w-full md:w-auto">
          <TabsTrigger value="all">All Subjects</TabsTrigger>
          <TabsTrigger value="theory">Theory</TabsTrigger>
          <TabsTrigger value="practical">Practical</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => (
              <Card 
                key={subject.id} 
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle>{subject.name}</CardTitle>
                      <CardDescription>
                        {subject.completed} of {subject.topics} topics completed
                      </CardDescription>
                    </div>
                    <Badge className={subject.type === 'theory' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' : 'bg-green-100 text-green-800 hover:bg-green-100'}>
                      {subject.type === 'theory' ? 'Theory' : 'Practical'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{subject.progress}%</span>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                  
                  <div className="mt-4 flex items-center text-sm text-muted-foreground">
                    <span>Next Topic: </span>
                    <span className="ml-1 text-foreground">{subject.nextTopic}</span>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/50 py-3">
                  <Button className="w-full" variant="outline">
                    Continue Learning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="theory" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {subjects.filter(s => s.type === 'theory').map((subject) => (
              <Card 
                key={subject.id} 
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle>{subject.name}</CardTitle>
                      <CardDescription>
                        {subject.completed} of {subject.topics} topics completed
                      </CardDescription>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                      Theory
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{subject.progress}%</span>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                  
                  <div className="mt-4 flex items-center text-sm text-muted-foreground">
                    <span>Next Topic: </span>
                    <span className="ml-1 text-foreground">{subject.nextTopic}</span>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/50 py-3">
                  <Button className="w-full" variant="outline">
                    Continue Learning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="practical" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {subjects.filter(s => s.type === 'practical').map((subject) => (
              <Card 
                key={subject.id} 
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle>{subject.name}</CardTitle>
                      <CardDescription>
                        {subject.completed} of {subject.topics} topics completed
                      </CardDescription>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      Practical
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{subject.progress}%</span>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                  
                  <div className="mt-4 flex items-center text-sm text-muted-foreground">
                    <span>Next Topic: </span>
                    <span className="ml-1 text-foreground">{subject.nextTopic}</span>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/50 py-3">
                  <Button className="w-full" variant="outline">
                    Continue Learning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Recommended Materials</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { title: 'Pharmaceutical Chemistry: Heterocyclic Compounds', type: 'Reading', icon: <BookOpen className="h-8 w-8 text-blue-500" /> },
              { title: 'Pharmacology: Drug Actions and Interactions', type: 'Video Lecture', icon: <ClipboardList className="h-8 w-8 text-green-500" /> },
              { title: 'Top Scores: Pharmaceutical Analysis Practice Test', type: 'Quiz', icon: <Medal className="h-8 w-8 text-amber-500" /> }
            ].map((material, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    {material.icon}
                    <h3 className="mt-3 font-medium">{material.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{material.type}</p>
                    <Button variant="outline" className="mt-4 w-full">View Material</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentCourses;
