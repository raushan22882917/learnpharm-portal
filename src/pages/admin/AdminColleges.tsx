
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { School, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { collegeService, College } from '@/services/collegeService';
import { useToast } from '@/hooks/use-toast';

const AdminColleges: React.FC = () => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    setIsLoading(true);
    try {
      const data = await collegeService.getAll();
      setColleges(data);
    } catch (error) {
      console.error('Error fetching colleges:', error);
      toast({
        title: 'Error',
        description: 'Failed to load colleges. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleActive = async (id: number) => {
    try {
      await collegeService.toggleActive(id);
      toast({
        title: 'Success',
        description: 'College status updated successfully',
      });
      // Refresh colleges list
      fetchColleges();
    } catch (error) {
      console.error('Error updating college status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update college status',
        variant: 'destructive'
      });
    }
  };

  // Filter colleges based on search query and status filter
  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === null || 
                         (activeFilter === 'active' && college.status === 'active') ||
                         (activeFilter === 'inactive' && college.status === 'inactive');
    return matchesSearch && matchesFilter;
  });

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
            variant={activeFilter === 'inactive' ? "default" : "outline"} 
            size="sm"
            onClick={() => setActiveFilter('inactive')}
          >
            Inactive
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredColleges.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <School className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-lg">No colleges found</p>
                <p className="text-muted-foreground text-sm">Try adjusting your search or filters</p>
              </CardContent>
            </Card>
          ) : (
            filteredColleges.map((college) => (
              <Card key={college.id} className={`${college.status === 'inactive' ? 'opacity-70' : ''}`}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <School className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle>{college.name}</CardTitle>
                        <CardDescription>{college.description}</CardDescription>
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
                        <p className="text-xl font-bold">{college.students_count || 0}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Faculty</p>
                        <p className="text-xl font-bold">{college.faculty_count || 0}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className={college.status === 'active' ? 'text-red-600' : 'text-green-600'}
                        onClick={() => handleToggleActive(college.id)}
                      >
                        {college.status === 'active' ? 'Deactivate' : 'Activate'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminColleges;
