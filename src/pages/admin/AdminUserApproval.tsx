
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, UserCheck, UserX, Eye, School, GraduationCap, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

const AdminUserApproval: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Mock data for pending users
  const pendingUsers = [
    { 
      id: 1, 
      name: 'Dr. Rajesh Kumar', 
      email: 'rajesh.kumar@example.com', 
      role: 'principal', 
      college: 'College of Pharmacy Sciences', 
      requestDate: '2023-09-15',
      details: {
        phone: '+91 98765 43210',
        qualification: 'Ph.D. in Pharmaceutical Sciences',
        experience: '15 years',
        regNumber: 'PCI-P-12345'
      }
    },
    { 
      id: 2, 
      name: 'Dr. Priya Sharma', 
      email: 'priya.sharma@example.com', 
      role: 'faculty', 
      college: 'Modern Pharmacy College', 
      requestDate: '2023-09-18',
      details: {
        phone: '+91 87654 32109',
        qualification: 'Ph.D. in Pharmacology',
        experience: '8 years',
        regNumber: 'PCI-F-23456'
      }
    },
    { 
      id: 3, 
      name: 'Amit Patel', 
      email: 'amit.patel@example.com', 
      role: 'student', 
      college: 'National Institute of Pharmaceutical Education', 
      requestDate: '2023-09-20',
      details: {
        phone: '+91 76543 21098',
        qualification: 'B.Pharm Year 2',
        regNumber: 'NIPE-S-34567',
        enrollmentDate: '2022-08-01'
      }
    }
  ];
  
  // Mock data for recently approved users
  const recentApprovals = [
    { 
      id: 101, 
      name: 'Dr. Sanjay Gupta', 
      email: 'sanjay.gupta@example.com', 
      role: 'principal', 
      college: 'Prime College of Pharmacy', 
      approvedDate: '2023-09-10',
      approvedBy: 'Admin'
    },
    { 
      id: 102, 
      name: 'Dr. Meera Desai', 
      email: 'meera.desai@example.com', 
      role: 'faculty', 
      college: 'College of Pharmacy Sciences', 
      approvedDate: '2023-09-12',
      approvedBy: 'Admin'
    }
  ];

  const handleViewDetails = (user: any) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  const handleApproveUser = (user: any) => {
    // In a real implementation, this would call an API to approve the user
    toast({
      title: "User Approved",
      description: `${user.name} has been approved as ${user.role}.`,
    });
    setDialogOpen(false);
  };

  const handleRejectUser = (user: any) => {
    // In a real implementation, this would call an API to reject the user
    toast({
      title: "User Rejected",
      description: `${user.name}'s application has been rejected.`,
      variant: "destructive"
    });
    setDialogOpen(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Approval</h1>
        <p className="text-muted-foreground">
          Review and approve user registration requests
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
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
          <Button variant="outline" size="sm">Principals</Button>
          <Button variant="outline" size="sm">Faculty</Button>
          <Button variant="outline" size="sm">Students</Button>
        </div>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="pending">Pending Approval</TabsTrigger>
          <TabsTrigger value="recent">Recently Approved</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending Approval Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {pendingUsers.map((user) => (
                  <div key={user.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-md">
                    <div className="flex items-center mb-4 md:mb-0">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${
                        user.role === 'principal' ? 'bg-blue-100' : 
                        user.role === 'faculty' ? 'bg-green-100' : 'bg-amber-100'
                      }`}>
                        {user.role === 'principal' ? 
                          <School className="h-5 w-5 text-blue-600" /> : 
                          user.role === 'faculty' ? 
                          <Users className="h-5 w-5 text-green-600" /> : 
                          <GraduationCap className="h-5 w-5 text-amber-600" />}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full capitalize">
                            {user.role}
                          </span>
                          <span className="text-xs text-muted-foreground mx-2">•</span>
                          <span className="text-xs text-muted-foreground">{user.college}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDetails(user)}
                      >
                        <Eye className="h-4 w-4 mr-1" /> View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-green-600"
                        onClick={() => handleApproveUser(user)}
                      >
                        <UserCheck className="h-4 w-4 mr-1" /> Approve
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-600"
                        onClick={() => handleRejectUser(user)}
                      >
                        <UserX className="h-4 w-4 mr-1" /> Reject
                      </Button>
                    </div>
                  </div>
                ))}

                {pendingUsers.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No pending approval requests
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recent" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recently Approved Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {recentApprovals.map((user) => (
                  <div key={user.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-md">
                    <div className="flex items-center mb-4 md:mb-0">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${
                        user.role === 'principal' ? 'bg-blue-100' : 
                        user.role === 'faculty' ? 'bg-green-100' : 'bg-amber-100'
                      }`}>
                        {user.role === 'principal' ? 
                          <School className="h-5 w-5 text-blue-600" /> : 
                          user.role === 'faculty' ? 
                          <Users className="h-5 w-5 text-green-600" /> : 
                          <GraduationCap className="h-5 w-5 text-amber-600" />}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium">{user.name}</p>
                          <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                            Approved
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full capitalize">
                            {user.role}
                          </span>
                          <span className="text-xs text-muted-foreground mx-2">•</span>
                          <span className="text-xs text-muted-foreground">{user.college}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-right">
                      <p>Approved on: {user.approvedDate}</p>
                      <p className="text-muted-foreground">By: {user.approvedBy}</p>
                    </div>
                  </div>
                ))}

                {recentApprovals.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No recent approvals
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* User Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Review user information before approval
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center mr-4 ${
                  selectedUser.role === 'principal' ? 'bg-blue-100' : 
                  selectedUser.role === 'faculty' ? 'bg-green-100' : 'bg-amber-100'
                }`}>
                  {selectedUser.role === 'principal' ? 
                    <School className="h-6 w-6 text-blue-600" /> : 
                    selectedUser.role === 'faculty' ? 
                    <Users className="h-6 w-6 text-green-600" /> : 
                    <GraduationCap className="h-6 w-6 text-amber-600" />}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
                  <p className="text-muted-foreground capitalize">{selectedUser.role}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm">{selectedUser.details.phone}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium">College</p>
                <p className="text-sm">{selectedUser.college}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium">Qualification</p>
                <p className="text-sm">{selectedUser.details.qualification}</p>
              </div>
              
              {selectedUser.details.experience && (
                <div>
                  <p className="text-sm font-medium">Experience</p>
                  <p className="text-sm">{selectedUser.details.experience}</p>
                </div>
              )}
              
              <div>
                <p className="text-sm font-medium">Registration Number</p>
                <p className="text-sm">{selectedUser.details.regNumber}</p>
              </div>
              
              {selectedUser.details.enrollmentDate && (
                <div>
                  <p className="text-sm font-medium">Enrollment Date</p>
                  <p className="text-sm">{selectedUser.details.enrollmentDate}</p>
                </div>
              )}
              
              <div>
                <p className="text-sm font-medium">Request Date</p>
                <p className="text-sm">{selectedUser.requestDate}</p>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              className="text-red-600"
              onClick={() => handleRejectUser(selectedUser)}
            >
              <UserX className="h-4 w-4 mr-1" /> Reject User
            </Button>
            <Button 
              className="text-white"
              onClick={() => handleApproveUser(selectedUser)}
            >
              <UserCheck className="h-4 w-4 mr-1" /> Approve User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUserApproval;
