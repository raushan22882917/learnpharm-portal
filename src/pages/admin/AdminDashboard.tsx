
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Users, BookOpen, Building, CreditCard, BookMarked } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FeedbackForm from '@/components/ui-elements/FeedbackForm';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Total Colleges',
      value: '24',
      description: 'Active institutions',
      icon: <Building className="h-5 w-5 text-blue-600" />,
      change: '+2 this month',
      onClick: () => navigate('/admin/colleges')
    },
    {
      title: 'Total Students',
      value: '3,842',
      description: 'Across all colleges',
      icon: <Users className="h-5 w-5 text-green-600" />,
      change: '+128 this month',
      onClick: () => navigate('/admin/users')
    },
    {
      title: 'Faculty Members',
      value: '156',
      description: 'Teaching staff',
      icon: <Users className="h-5 w-5 text-purple-600" />,
      change: '+4 this month',
      onClick: () => navigate('/admin/users')
    },
    {
      title: 'Subjects',
      value: '42',
      description: 'Available subjects',
      icon: <BookOpen className="h-5 w-5 text-amber-600" />,
      change: '+3 this month',
      onClick: () => navigate('/admin/content')
    },
    {
      title: 'Revenue',
      value: '₹5.24M',
      description: 'Current semester',
      icon: <CreditCard className="h-5 w-5 text-indigo-600" />,
      change: '+18% YoY',
      onClick: () => navigate('/admin/analytics')
    },
    {
      title: 'Content Modules',
      value: '156',
      description: 'Study materials',
      icon: <BookMarked className="h-5 w-5 text-red-600" />,
      change: '+12 this month',
      onClick: () => navigate('/admin/content')
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Overview and management of the PharmLearn platform.
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Data</TabsTrigger>
              <TabsTrigger value="semester">Current Semester</TabsTrigger>
              <TabsTrigger value="year">Current Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, i) => (
          <Card 
            key={i} 
            className="dashboard-card cursor-pointer"
            onClick={stat.onClick}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <div className="mt-2 text-xs font-medium text-green-600">
                {stat.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="dashboard-card col-span-1 md:col-span-1">
          <CardHeader>
            <CardTitle>Revenue Summary</CardTitle>
            <CardDescription>
              Monthly revenue breakdown across colleges
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[240px] flex items-center justify-center">
            <BarChart3 className="h-16 w-16 text-muted-foreground/50" />
            <span className="ml-4 text-muted-foreground">Analytics visualization will appear here</span>
          </CardContent>
        </Card>

        <Card className="dashboard-card col-span-1 md:col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest platform updates and changes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { text: "New college registered: Modern Pharmacy College", time: "2 hours ago" },
                { text: "Content update: Pharmaceutical Chemistry", time: "5 hours ago" },
                { text: "New batch of students enrolled: B.Pharm 2023", time: "1 day ago" },
                { text: "Security settings updated by admin", time: "2 days ago" }
              ].map((activity, i) => (
                <div key={i} className="flex items-start">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3"></div>
                  <div>
                    <p className="text-sm">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="hidden md:block">
        <FeedbackForm />
      </div>
      
      <div className="md:hidden">
        <FeedbackForm compact />
      </div>
    </div>
  );
};

export default AdminDashboard;
