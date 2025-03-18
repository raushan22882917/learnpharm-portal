
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, GraduationCap, School, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const AdminUsers: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users Management</h1>
          <p className="text-muted-foreground">
            Manage all users in the PharmLearn platform
          </p>
        </div>
        
        <Button className="mt-4 md:mt-0">
          <Plus className="mr-2 h-4 w-4" /> Add New User
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-4 w-full md:w-auto">
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="principals">Principals</TabsTrigger>
          <TabsTrigger value="faculty">Faculty</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
        </TabsList>
        
        <div className="flex flex-col md:flex-row gap-4 items-center mt-6">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
              className="pl-8 w-full"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" size="sm">All</Button>
            <Button variant="outline" size="sm">Active</Button>
            <Button variant="outline" size="sm">Inactive</Button>
          </div>
        </div>

        <TabsContent value="all" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {[
                  { name: 'Dr. Rajesh Kumar', role: 'Principal', college: 'College of Pharmacy Sciences', email: 'rajesh@example.com', status: 'active' },
                  { name: 'Dr. Priya Sharma', role: 'Faculty', college: 'College of Pharmacy Sciences', email: 'priya@example.com', status: 'active' },
                  { name: 'Amit Patel', role: 'Student', college: 'College of Pharmacy Sciences', email: 'amit@example.com', status: 'active' },
                  { name: 'Dr. Sanjay Gupta', role: 'Principal', college: 'Modern Pharmacy College', email: 'sanjay@example.com', status: 'inactive' }
                ].map((user, i) => (
                  <div key={i} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-md">
                    <div className="flex items-center mb-4 md:mb-0">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${
                        user.role === 'Principal' ? 'bg-blue-100' : 
                        user.role === 'Faculty' ? 'bg-green-100' : 'bg-amber-100'
                      }`}>
                        {user.role === 'Principal' ? 
                          <School className="h-5 w-5 text-blue-600" /> : 
                          user.role === 'Faculty' ? 
                          <Users className="h-5 w-5 text-green-600" /> : 
                          <GraduationCap className="h-5 w-5 text-amber-600" />}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-xs text-muted-foreground">{user.role}</span>
                          <span className="text-xs text-muted-foreground mx-2">•</span>
                          <span className="text-xs text-muted-foreground">{user.college}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm" className={user.status === 'active' ? 'text-red-600' : 'text-green-600'}>
                        {user.status === 'active' ? 'Deactivate' : 'Activate'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="principals" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Principals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="py-8 text-center text-muted-foreground">
                Switch to the "All Users" tab and filter by role to view principals
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="faculty" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Faculty</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="py-8 text-center text-muted-foreground">
                Switch to the "All Users" tab and filter by role to view faculty
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="students" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="py-8 text-center text-muted-foreground">
                Switch to the "All Users" tab and filter by role to view students
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminUsers;
