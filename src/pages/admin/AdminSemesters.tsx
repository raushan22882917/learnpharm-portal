
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Calendar, Search, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const AdminSemesters: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const [activeSemester, setActiveSemester] = useState<any>(null);
  
  // Mock data for semesters
  const [semesters, setSemesters] = useState([
    { 
      id: 1, 
      name: 'Semester 1 2023-24', 
      startDate: '2023-08-01', 
      endDate: '2023-12-15',
      year: '2023-24',
      description: 'First semester of B.Pharm curriculum',
      status: 'active',
      subjects: 5
    },
    { 
      id: 2, 
      name: 'Semester 2 2023-24', 
      startDate: '2024-01-10', 
      endDate: '2024-05-30',
      year: '2023-24',
      description: 'Second semester of B.Pharm curriculum',
      status: 'upcoming',
      subjects: 6
    },
    { 
      id: 3, 
      name: 'Semester 1 2022-23', 
      startDate: '2022-08-01', 
      endDate: '2022-12-15',
      year: '2022-23',
      description: 'First semester of B.Pharm curriculum',
      status: 'archived',
      subjects: 5
    }
  ]);

  const handleCreateSemester = () => {
    setDialogMode('create');
    setActiveSemester(null);
    setOpenDialog(true);
  };

  const handleEditSemester = (semester: any) => {
    setDialogMode('edit');
    setActiveSemester(semester);
    setOpenDialog(true);
  };

  const handleSaveSemester = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real implementation, this would save to backend
    setOpenDialog(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Semester Management</h1>
          <p className="text-muted-foreground">
            Create, edit and manage academic semesters
          </p>
        </div>
        
        <Button onClick={handleCreateSemester} className="mt-4 md:mt-0">
          <Plus className="mr-2 h-4 w-4" /> Create New Semester
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search semesters..."
            className="pl-8 w-full"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" size="sm">All</Button>
          <Button variant="outline" size="sm">Active</Button>
          <Button variant="outline" size="sm">Upcoming</Button>
          <Button variant="outline" size="sm">Archived</Button>
        </div>
      </div>

      <div className="grid gap-6">
        {semesters.map((semester) => (
          <Card key={semester.id} className={semester.status === 'archived' ? 'opacity-70' : ''}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{semester.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">Year: {semester.year}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 text-xs rounded-full ${
                  semester.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : semester.status === 'upcoming'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {semester.status.charAt(0).toUpperCase() + semester.status.slice(1)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{semester.description}</p>
                  <div className="flex gap-8 mt-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Start Date</p>
                      <p className="text-sm font-medium">{semester.startDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">End Date</p>
                      <p className="text-sm font-medium">{semester.endDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Subjects</p>
                      <p className="text-sm font-medium">{semester.subjects}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                  <Button onClick={() => handleEditSemester(semester)} variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                  {semester.status !== 'active' && (
                    <Button variant="outline" size="sm" className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>{dialogMode === 'create' ? 'Create New Semester' : 'Edit Semester'}</DialogTitle>
            <DialogDescription>
              {dialogMode === 'create' 
                ? 'Add a new academic semester to the system.' 
                : 'Update the details of this semester.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveSemester}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="name" className="text-sm font-medium">Semester Name</label>
                <Input
                  id="name"
                  placeholder="e.g., Semester 1 2023-24"
                  defaultValue={activeSemester?.name || ''}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="startDate" className="text-sm font-medium">Start Date</label>
                  <Input
                    id="startDate"
                    type="date"
                    defaultValue={activeSemester?.startDate || ''}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="endDate" className="text-sm font-medium">End Date</label>
                  <Input
                    id="endDate"
                    type="date"
                    defaultValue={activeSemester?.endDate || ''}
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="year" className="text-sm font-medium">Academic Year</label>
                <Input
                  id="year"
                  placeholder="e.g., 2023-24"
                  defaultValue={activeSemester?.year || ''}
                  required
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <Textarea
                  id="description"
                  placeholder="Describe this semester..."
                  defaultValue={activeSemester?.description || ''}
                  className="resize-none"
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="status" className="text-sm font-medium">Status</label>
                <select 
                  id="status" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  defaultValue={activeSemester?.status || 'upcoming'}
                >
                  <option value="active">Active</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Semester</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSemesters;
