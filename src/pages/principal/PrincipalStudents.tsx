
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GraduationCap, Search, UserPlus, CreditCard, FileUp, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const PrincipalStudents: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Management</h1>
          <p className="text-muted-foreground">
            Manage students and payment status
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

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-4 w-full md:w-auto">
          <TabsTrigger value="all">All Students</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="payments">Payment Due</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between md:items-center">
                <div>
                  <CardTitle>All Students</CardTitle>
                  <CardDescription>Total 850 students</CardDescription>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                  <Button variant="outline" size="sm">B.Pharm</Button>
                  <Button variant="outline" size="sm">M.Pharm</Button>
                  <Button variant="outline" size="sm">D.Pharm</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 1, name: 'Amit Patel', rollNumber: 'BP2023001', year: '2nd Year', semester: 'Semester 3', paymentStatus: 'Paid', status: 'active' },
                  { id: 2, name: 'Priya Sharma', rollNumber: 'BP2023002', year: '2nd Year', semester: 'Semester 3', paymentStatus: 'Due', status: 'active' },
                  { id: 3, name: 'Raj Singh', rollNumber: 'BP2023003', year: '2nd Year', semester: 'Semester 3', paymentStatus: 'Paid', status: 'active' },
                  { id: 4, name: 'Neha Gupta', rollNumber: 'BP2023004', year: '2nd Year', semester: 'Semester 3', paymentStatus: 'Partial', status: 'active' },
                  { id: 5, name: 'Vikram Joshi', rollNumber: 'BP2023005', year: '2nd Year', semester: 'Semester 3', paymentStatus: 'Due', status: 'inactive' }
                ].map((student) => (
                  <div key={student.id} className="border rounded-lg p-4 hover:bg-accent/5 transition-colors">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                          <GraduationCap className="h-5 w-5 text-primary" />
                        </div>
                        
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium">{student.name}</h3>
                            <Badge 
                              className={`ml-2 ${
                                student.status === 'active' 
                                  ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                                  : 'bg-gray-100 text-gray-800 hover:bg-gray-100'
                              }`}
                            >
                              {student.status === 'active' ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-muted-foreground">Roll No: {student.rollNumber}</p>
                          
                          <div className="flex items-center mt-1 text-sm text-muted-foreground">
                            <span>{student.year}</span>
                            <span className="mx-2">•</span>
                            <span>{student.semester}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 md:mt-0 md:ml-4 flex flex-col md:flex-row items-start md:items-center gap-4">
                        <div className="flex items-center">
                          <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className={`text-sm font-medium ${
                            student.paymentStatus === 'Paid' 
                              ? 'text-green-600' 
                              : student.paymentStatus === 'Partial'
                              ? 'text-amber-600'
                              : 'text-red-600'
                          }`}>
                            {student.paymentStatus}
                          </span>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View Details</Button>
                          <Button variant="outline" size="sm">Edit</Button>
                          {student.status === 'active' ? (
                            <Button variant="outline" size="sm" className="text-red-600">Deactivate</Button>
                          ) : (
                            <Button variant="outline" size="sm" className="text-green-600">Activate</Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="active" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="py-8 text-center text-muted-foreground">
                Switch to the "All Students" tab and use the status filter to view active students
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Due</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="py-8 text-center text-muted-foreground">
                Switch to the "All Students" tab and use the payment filter to view students with pending payments
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inactive" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Inactive Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="py-8 text-center text-muted-foreground">
                Switch to the "All Students" tab and use the status filter to view inactive students
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PrincipalStudents;
