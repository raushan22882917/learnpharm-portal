
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Search, Plus, Upload, BookMarked, Edit, FileText } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const FacultyContent: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
          <p className="text-muted-foreground">
            Manage your teaching materials and content
          </p>
        </div>
        
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Content
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" /> Upload Materials
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search content..."
            className="pl-8 w-full"
          />
        </div>
      </div>

      <Tabs defaultValue="subjects" className="w-full">
        <TabsList className="grid grid-cols-3 w-full md:w-auto">
          <TabsTrigger value="subjects">My Subjects</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="pending">Pending Updates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="subjects" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { id: 1, name: 'Pharmaceutical Chemistry', code: 'PHARM101', semester: 'Semester 1', materials: 12, students: 85 },
              { id: 2, name: 'Pharmacology', code: 'PHARM202', semester: 'Semester 3', materials: 15, students: 78 },
              { id: 3, name: 'Medicinal Chemistry', code: 'PHARM301', semester: 'Semester 5', materials: 8, students: 22 }
            ].map((subject) => (
              <Card key={subject.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{subject.name}</CardTitle>
                    <Badge>{subject.code}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{subject.semester}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Materials</p>
                      <p className="text-lg font-bold">{subject.materials}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Students</p>
                      <p className="text-lg font-bold">{subject.students}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-6">
                    <Button size="sm" className="w-full">View Content</Button>
                    <Button size="sm" variant="outline" className="w-full">Add Material</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="materials" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Teaching Materials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 1, title: 'Introduction to Pharmaceutical Chemistry', type: 'Lecture Notes', subject: 'Pharmaceutical Chemistry', date: '15 Apr 2023', status: 'Published' },
                  { id: 2, title: 'Autonomic Nervous System', type: 'Presentation', subject: 'Pharmacology', date: '22 Apr 2023', status: 'Published' },
                  { id: 3, title: 'Heterocyclic Compounds in Drug Design', type: 'Video Lecture', subject: 'Medicinal Chemistry', date: '05 May 2023', status: 'Draft' },
                  { id: 4, title: 'Pharmacodynamics: Dose-Response Relationships', type: 'MCQ Set', subject: 'Pharmacology', date: '12 May 2023', status: 'Published' },
                  { id: 5, title: 'Pharmaceutical Analysis Methods', type: 'Lab Guide', subject: 'Pharmaceutical Chemistry', date: '18 May 2023', status: 'Pending Review' }
                ].map((material) => (
                  <div key={material.id} className="flex flex-col md:flex-row justify-between p-4 border rounded-md">
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium">{material.title}</h3>
                          <Badge 
                            className={`ml-2 ${
                              material.status === 'Published' 
                                ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                                : material.status === 'Draft'
                                ? 'bg-gray-100 text-gray-800 hover:bg-gray-100'
                                : 'bg-amber-100 text-amber-800 hover:bg-amber-100'
                            }`}
                          >
                            {material.status}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">{material.subject} • {material.type}</p>
                        <p className="text-xs text-muted-foreground mt-1">Last updated: {material.date}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" /> Edit
                      </Button>
                      {material.status !== 'Published' ? (
                        <Button variant="outline" size="sm" className="text-green-600">Publish</Button>
                      ) : (
                        <Button variant="outline" size="sm">View</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending Content Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 1, title: 'Pharmaceutical Chemistry - Week 3', description: 'MCQs need to be updated for recent syllabus changes', priority: 'high' },
                  { id: 2, title: 'Pharmacology - Practical Guidelines', description: 'Lab instructions need review before next session', priority: 'medium' },
                  { id: 3, title: 'Medicinal Chemistry - Reference Materials', description: 'New journal articles to be added to reading list', priority: 'low' }
                ].map((update) => (
                  <div key={update.id} className="flex items-start p-4 border rounded-md">
                    <div className={`h-2 w-2 rounded-full mt-2 mr-3 ${
                      update.priority === 'high' ? 'bg-red-500' : 
                      update.priority === 'medium' ? 'bg-amber-500' : 'bg-green-500'
                    }`}></div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">{update.title}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          update.priority === 'high' ? 'bg-red-100 text-red-800' : 
                          update.priority === 'medium' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {update.priority.charAt(0).toUpperCase() + update.priority.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{update.description}</p>
                      <div className="mt-3">
                        <Button size="sm">Update Now</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FacultyContent;
