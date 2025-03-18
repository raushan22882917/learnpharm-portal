
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { School, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const AdminColleges: React.FC = () => {
  const colleges = [
    {
      id: 1,
      name: 'College of Pharmacy Sciences',
      location: 'Mumbai, India',
      students: 850,
      faculty: 32,
      status: 'active'
    },
    {
      id: 2,
      name: 'Modern Pharmacy College',
      location: 'Delhi, India',
      students: 720,
      faculty: 28,
      status: 'active'
    },
    {
      id: 3,
      name: 'National Institute of Pharmaceutical Education',
      location: 'Bangalore, India',
      students: 930,
      faculty: 40,
      status: 'active'
    },
    {
      id: 4,
      name: 'Prime College of Pharmacy',
      location: 'Hyderabad, India',
      students: 650,
      faculty: 25,
      status: 'inactive'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Colleges</h1>
          <p className="text-muted-foreground">
            Manage all pharmacy colleges in the system
          </p>
        </div>
        
        <Button className="mt-4 md:mt-0">
          <Plus className="mr-2 h-4 w-4" /> Add New College
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search colleges..."
            className="pl-8 w-full"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" size="sm">All</Button>
          <Button variant="outline" size="sm">Active</Button>
          <Button variant="outline" size="sm">Inactive</Button>
        </div>
      </div>

      <div className="grid gap-6">
        {colleges.map((college) => (
          <Card key={college.id} className={`${college.status === 'inactive' ? 'opacity-70' : ''}`}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <School className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{college.name}</CardTitle>
                    <CardDescription>{college.location}</CardDescription>
                  </div>
                </div>
                <div className={`px-2 py-1 text-xs rounded-full ${
                  college.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {college.status === 'active' ? 'Active' : 'Inactive'}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div className="flex gap-8">
                  <div>
                    <p className="text-sm text-muted-foreground">Students</p>
                    <p className="text-xl font-bold">{college.students}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Faculty</p>
                    <p className="text-xl font-bold">{college.faculty}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm" className={college.status === 'active' ? 'text-red-600' : 'text-green-600'}>
                    {college.status === 'active' ? 'Deactivate' : 'Activate'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminColleges;
