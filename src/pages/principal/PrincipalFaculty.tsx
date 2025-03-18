
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, UserPlus, Search, Mail, Phone, GraduationCap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const PrincipalFaculty: React.FC = () => {
  const facultyMembers = [
    { 
      id: 1, 
      name: 'Dr. Priya Sharma', 
      department: 'Pharmacology', 
      email: 'priya.sharma@example.com', 
      phone: '+91 98765 43210',
      qualification: 'Ph.D. in Pharmacology',
      courses: ['Pharmacology I', 'Pharmacology II'],
      status: 'active'
    },
    { 
      id: 2, 
      name: 'Dr. Sanjay Gupta', 
      department: 'Pharmaceutical Chemistry', 
      email: 'sanjay.gupta@example.com', 
      phone: '+91 98765 43211',
      qualification: 'Ph.D. in Chemistry',
      courses: ['Pharmaceutical Chemistry I', 'Medicinal Chemistry'],
      status: 'active'
    },
    { 
      id: 3, 
      name: 'Dr. Rahul Patel', 
      department: 'Pharmaceutics', 
      email: 'rahul.patel@example.com', 
      phone: '+91 98765 43212',
      qualification: 'Ph.D. in Pharmaceutics',
      courses: ['Pharmaceutics I', 'Pharmaceutical Technology'],
      status: 'active'
    },
    { 
      id: 4, 
      name: 'Dr. Neha Singh', 
      department: 'Pharmaceutical Analysis', 
      email: 'neha.singh@example.com', 
      phone: '+91 98765 43213',
      qualification: 'Ph.D. in Analytical Chemistry',
      courses: ['Pharmaceutical Analysis I', 'Quality Assurance'],
      status: 'active'
    },
    { 
      id: 5, 
      name: 'Dr. Amit Kumar', 
      department: 'Pharmacognosy', 
      email: 'amit.kumar@example.com', 
      phone: '+91 98765 43214',
      qualification: 'Ph.D. in Pharmacognosy',
      courses: ['Pharmacognosy I', 'Herbal Medicine'],
      status: 'on leave'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Faculty Management</h1>
          <p className="text-muted-foreground">
            Manage faculty members and their courses
          </p>
        </div>
        
        <Button className="mt-4 md:mt-0">
          <UserPlus className="mr-2 h-4 w-4" /> Add Faculty Member
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search faculty..."
            className="pl-8 w-full"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" size="sm">All</Button>
          <Button variant="outline" size="sm">Active</Button>
          <Button variant="outline" size="sm">On Leave</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Faculty Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {facultyMembers.map((faculty) => (
              <div 
                key={faculty.id} 
                className="border rounded-lg p-4 hover:bg-accent/5 transition-colors"
              >
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="flex items-start">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium text-lg">{faculty.name}</h3>
                        <Badge 
                          className={`ml-2 ${faculty.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 'bg-amber-100 text-amber-800 hover:bg-amber-100'}`}
                        >
                          {faculty.status === 'active' ? 'Active' : 'On Leave'}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{faculty.department}</p>
                      
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center">
                          <Mail className="h-3.5 w-3.5 text-muted-foreground mr-2" />
                          <span className="text-sm">{faculty.email}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <Phone className="h-3.5 w-3.5 text-muted-foreground mr-2" />
                          <span className="text-sm">{faculty.phone}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <GraduationCap className="h-3.5 w-3.5 text-muted-foreground mr-2" />
                          <span className="text-sm">{faculty.qualification}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:ml-4">
                    <h4 className="text-sm font-medium mb-2">Assigned Courses</h4>
                    <div className="flex flex-wrap gap-2">
                      {faculty.courses.map((course, i) => (
                        <Badge key={i} variant="outline">{course}</Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm" className="text-blue-600">Assign Courses</Button>
                      {faculty.status === 'active' ? (
                        <Button variant="outline" size="sm" className="text-amber-600">Set On Leave</Button>
                      ) : (
                        <Button variant="outline" size="sm" className="text-green-600">Set Active</Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrincipalFaculty;
