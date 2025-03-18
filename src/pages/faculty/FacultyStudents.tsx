
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GraduationCap, Search, FileUp, UserPlus, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const FacultyStudents: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground">
            Manage your assigned students
          </p>
        </div>
        
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button>
            <UserPlus className="mr-2 h-4 w-4" /> Add Student
          </Button>
          <Button variant="outline">
            <FileUp className="mr-2 h-4 w-4" /> Bulk Upload
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search students..."
            className="pl-8 w-full"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-3.5 w-3.5" /> Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="assigned" className="w-full">
        <TabsList className="grid grid-cols-3 w-full md:w-auto">
          <TabsTrigger value="assigned">Assigned to Me</TabsTrigger>
          <TabsTrigger value="year1">1st Year</TabsTrigger>
          <TabsTrigger value="year2">2nd Year</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assigned" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between md:items-center">
                <CardTitle>Students Assigned to Me</CardTitle>
                <div className="flex gap-2 mt-4 md:mt-0">
                  <Button variant="outline" size="sm">Pharmacology</Button>
                  <Button variant="outline" size="sm">Pharm. Chemistry</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 1, name: 'Amit Patel', rollNumber: 'BP2023001', year: '2nd Year', semester: 'Semester 3', attendance: '85%', performance: 'Good' },
                  { id: 2, name: 'Priya Sharma', rollNumber: 'BP2023002', year: '2nd Year', semester: 'Semester 3', attendance: '92%', performance: 'Excellent' },
                  { id: 3, name: 'Raj Singh', rollNumber: 'BP2023003', year: '2nd Year', semester: 'Semester 3', attendance: '76%', performance: 'Average' },
                  { id: 4, name: 'Neha Gupta', rollNumber: 'BP2023004', year: '2nd Year', semester: 'Semester 3', attendance: '68%', performance: 'Below Average' },
                  { id: 5, name: 'Vikram Joshi', rollNumber: 'BP2023005', year: '2nd Year', semester: 'Semester 3', attendance: '88%', performance: 'Good' }
                ].map((student) => (
                  <div key={student.id} className="border rounded-lg p-4 hover:bg-accent/5 transition-colors">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                          <GraduationCap className="h-5 w-5 text-primary" />
                        </div>
                        
                        <div>
                          <h3 className="font-medium">{student.name}</h3>
                          <p className="text-sm text-muted-foreground">Roll No: {student.rollNumber}</p>
                          
                          <div className="flex items-center mt-1 text-sm text-muted-foreground">
                            <span>{student.year}</span>
                            <span className="mx-2">•</span>
                            <span>{student.semester}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 md:mt-0 md:ml-4 flex flex-col md:flex-row items-start md:items-center gap-4">
                        <div>
                          <div className="flex flex-col md:flex-row md:gap-4">
                            <div>
                              <p className="text-xs text-muted-foreground">Attendance</p>
                              <p className={`text-sm font-medium ${
                                parseInt(student.attendance) > 85 
                                  ? 'text-green-600' 
                                  : parseInt(student.attendance) > 75
                                  ? 'text-amber-600'
                                  : 'text-red-600'
                              }`}>
                                {student.attendance}
                              </p>
                            </div>
                            
                            <div className="mt-2 md:mt-0">
                              <p className="text-xs text-muted-foreground">Performance</p>
                              <p className={`text-sm font-medium ${
                                student.performance === 'Excellent' 
                                  ? 'text-green-600' 
                                  : student.performance === 'Good'
                                  ? 'text-blue-600'
                                  : student.performance === 'Average'
                                  ? 'text-amber-600'
                                  : 'text-red-600'
                              }`}>
                                {student.performance}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View Details</Button>
                          <Button variant="outline" size="sm">Update Notes</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="year1" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>1st Year Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="py-8 text-center text-muted-foreground">
                Switch to the "Assigned to Me" tab and filter by year to view 1st year students
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="year2" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>2nd Year Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="py-8 text-center text-muted-foreground">
                Switch to the "Assigned to Me" tab and filter by year to view 2nd year students
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FacultyStudents;
