import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Calendar, Search, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { semesterService, Semester } from '@/services/semesterService';
import { useToast } from '@/hooks/use-toast';

const AdminSemesters: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const [activeSemester, setActiveSemester] = useState<Semester | null>(null);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState<{
    name: string;
    startDate: string;
    endDate: string;
    year: string;
    description: string;
    status: 'active' | 'upcoming' | 'archived';
  }>({
    name: '',
    startDate: '',
    endDate: '',
    year: '',
    description: '',
    status: 'upcoming'
  });

  useEffect(() => {
    fetchSemesters();
  }, []);

  useEffect(() => {
    if (activeSemester) {
      setFormData({
        name: activeSemester.name || '',
        startDate: activeSemester.startDate || '',
        endDate: activeSemester.endDate || '',
        year: activeSemester.year || '',
        description: activeSemester.description || '',
        status: activeSemester.status || 'upcoming'
      });
    } else {
      setFormData({
        name: '',
        startDate: '',
        endDate: '',
        year: '',
        description: '',
        status: 'upcoming'
      });
    }
  }, [activeSemester]);

  const fetchSemesters = async () => {
    setIsLoading(true);
    try {
      const data = await semesterService.getAll();
      setSemesters(data);
    } catch (error) {
      console.error('Error fetching semesters:', error);
      toast({
        title: 'Error',
        description: 'Failed to load semesters. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateSemester = () => {
    setDialogMode('create');
    setActiveSemester(null);
    setOpenDialog(true);
  };

  const handleEditSemester = (semester: Semester) => {
    setDialogMode('edit');
    setActiveSemester(semester);
    setOpenDialog(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    
    if (id === 'status') {
      setFormData(prev => ({ 
        ...prev, 
        [id]: value as 'active' | 'upcoming' | 'archived'
      }));
    } else {
      setFormData(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleSaveSemester = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    
    try {
      if (dialogMode === 'create') {
        await semesterService.create(formData);
        toast({
          title: 'Success',
          description: 'Semester created successfully',
        });
      } else if (dialogMode === 'edit' && activeSemester) {
        await semesterService.update(activeSemester.id, formData);
        toast({
          title: 'Success',
          description: 'Semester updated successfully',
        });
      }
      
      fetchSemesters();
      setOpenDialog(false);
    } catch (error) {
      console.error('Error saving semester:', error);
      toast({
        title: 'Error',
        description: 'Failed to save semester. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSemester = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this semester? This action cannot be undone.')) {
      try {
        await semesterService.delete(id);
        toast({
          title: 'Success',
          description: 'Semester deleted successfully',
        });
        fetchSemesters();
      } catch (error) {
        console.error('Error deleting semester:', error);
        toast({
          title: 'Error',
          description: 'Failed to delete semester. Please try again.',
          variant: 'destructive'
        });
      }
    }
  };

  const filteredSemesters = semesters.filter(semester => {
    const matchesSearch = semester.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === null || semester.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button 
            variant={activeFilter === null ? "default" : "outline"} 
            size="sm"
            onClick={() => setActiveFilter(null)}
          >
            All
          </Button>
          <Button 
            variant={activeFilter === 'active' ? "default" : "outline"} 
            size="sm"
            onClick={() => setActiveFilter('active')}
          >
            Active
          </Button>
          <Button 
            variant={activeFilter === 'upcoming' ? "default" : "outline"} 
            size="sm"
            onClick={() => setActiveFilter('upcoming')}
          >
            Upcoming
          </Button>
          <Button 
            variant={activeFilter === 'archived' ? "default" : "outline"} 
            size="sm"
            onClick={() => setActiveFilter('archived')}
          >
            Archived
          </Button>
        </div>
      </div>

      {isLoading && !openDialog ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredSemesters.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Calendar className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-lg">No semesters found</p>
                <p className="text-muted-foreground text-sm">Try adjusting your search or filters</p>
              </CardContent>
            </Card>
          ) : (
            filteredSemesters.map((semester) => (
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
                          <p className="text-sm font-medium">{semester.startDate || 'Not set'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">End Date</p>
                          <p className="text-sm font-medium">{semester.endDate || 'Not set'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Subjects</p>
                          <p className="text-sm font-medium">{semester.subjects || 0}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4 md:mt-0">
                      <Button onClick={() => handleEditSemester(semester)} variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      {semester.status !== 'active' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600"
                          onClick={() => handleDeleteSemester(semester.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

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
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="startDate" className="text-sm font-medium">Start Date</label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="endDate" className="text-sm font-medium">End Date</label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="year" className="text-sm font-medium">Academic Year</label>
                <Input
                  id="year"
                  placeholder="e.g., 2023-24"
                  value={formData.year}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <Textarea
                  id="description"
                  placeholder="Describe this semester..."
                  value={formData.description}
                  onChange={handleInputChange}
                  className="resize-none"
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="status" className="text-sm font-medium">Status</label>
                <select 
                  id="status" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={formData.status}
                  onChange={handleInputChange}
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
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Semester'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSemesters;
