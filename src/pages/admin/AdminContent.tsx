
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, FileText, Layers, Upload, Plus, Search, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const AdminContent: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
          <p className="text-muted-foreground">
            Manage subjects, topics, and learning materials
          </p>
        </div>
        
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Content
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" /> Bulk Upload
          </Button>
        </div>
      </div>

      <Tabs defaultValue="subjects" className="w-full">
        <TabsList className="grid grid-cols-3 md:w-auto">
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="topics">Topics</TabsTrigger>
          <TabsTrigger value="materials">Study Materials</TabsTrigger>
        </TabsList>
        
        <div className="flex flex-col md:flex-row gap-4 items-center mt-6">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search content..."
              className="pl-8 w-full"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" size="sm">All</Button>
            <Button variant="outline" size="sm">B.Pharm</Button>
            <Button variant="outline" size="sm">M.Pharm</Button>
          </div>
        </div>

        <TabsContent value="subjects" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Subjects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {[
                  { name: 'Pharmaceutical Chemistry', code: 'PHARM101', year: '1st Year', semester: 'Semester 1', topics: 18 },
                  { name: 'Pharmacology', code: 'PHARM202', year: '2nd Year', semester: 'Semester 3', topics: 24 },
                  { name: 'Pharmaceutics', code: 'PHARM203', year: '2nd Year', semester: 'Semester 4', topics: 15 },
                  { name: 'Pharmaceutical Analysis', code: 'PHARM301', year: '3rd Year', semester: 'Semester 5', topics: 20 }
                ].map((subject, i) => (
                  <div key={i} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-md">
                    <div className="flex items-center mb-4 md:mb-0">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <Book className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{subject.name}</p>
                        <p className="text-sm text-muted-foreground">Code: {subject.code}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-xs text-muted-foreground">{subject.year}</span>
                          <span className="text-xs text-muted-foreground mx-2">•</span>
                          <span className="text-xs text-muted-foreground">{subject.semester}</span>
                          <span className="text-xs text-muted-foreground mx-2">•</span>
                          <span className="text-xs text-muted-foreground">{subject.topics} topics</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                      <Button variant="outline" size="sm">View Topics</Button>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="topics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="py-8 text-center text-muted-foreground">
                Please select a subject first to view its topics
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="materials" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Study Materials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: 'Heterocyclic Compounds', type: 'PDF', subject: 'Pharmaceutical Chemistry', size: '2.4 MB', date: '12 May 2023' },
                  { title: 'Autonomic Nervous System', type: 'Video', subject: 'Pharmacology', size: '156 MB', date: '28 Apr 2023' },
                  { title: 'Solid Dosage Forms', type: 'Interactive', subject: 'Pharmaceutics', size: '3.8 MB', date: '15 Jun 2023' },
                  { title: 'UV-Visible Spectroscopy', type: 'PDF', subject: 'Pharmaceutical Analysis', size: '1.7 MB', date: '22 Mar 2023' },
                  { title: 'Dose-Response Relationships', type: 'MCQ Set', subject: 'Pharmacology', size: '850 KB', date: '09 Apr 2023' },
                  { title: 'Tablet Formulation', type: 'Lab Guide', subject: 'Pharmaceutics', size: '3.1 MB', date: '05 May 2023' }
                ].map((material, i) => (
                  <Card key={i} className="h-full">
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 mt-1 ${
                          material.type === 'PDF' ? 'bg-red-100' : 
                          material.type === 'Video' ? 'bg-blue-100' : 
                          material.type === 'Interactive' ? 'bg-green-100' : 'bg-amber-100'
                        }`}>
                          {material.type === 'PDF' ? 
                            <FileText className="h-5 w-5 text-red-600" /> : 
                            material.type === 'Video' ? 
                            <Layers className="h-5 w-5 text-blue-600" /> : 
                            material.type === 'Interactive' ? 
                            <Layers className="h-5 w-5 text-green-600" /> :
                            <BookOpen className="h-5 w-5 text-amber-600" />}
                        </div>
                        <div>
                          <p className="font-medium">{material.title}</p>
                          <p className="text-sm text-muted-foreground">{material.subject}</p>
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-muted-foreground">{material.type}</span>
                            <span className="text-xs text-muted-foreground mx-2">•</span>
                            <span className="text-xs text-muted-foreground">{material.size}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Uploaded: {material.date}</p>
                          <div className="flex gap-2 mt-3">
                            <Button variant="outline" size="sm">View</Button>
                            <Button variant="outline" size="sm">Edit</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminContent;
