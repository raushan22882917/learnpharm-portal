
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart2, LineChart, PieChart, TrendingUp, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminAnalytics: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Platform-wide analytics and reporting
          </p>
        </div>
        
        <Button variant="outline" className="mt-4 md:mt-0">
          <Download className="mr-2 h-4 w-4" /> Export Reports
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-3 md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Total Students', value: '3,842', change: '+5.2%', icon: <BarChart2 className="h-4 w-4" />, color: 'blue' },
              { title: 'Active Colleges', value: '24', change: '+8.3%', icon: <LineChart className="h-4 w-4" />, color: 'green' },
              { title: 'Monthly Revenue', value: '₹842K', change: '+12.1%', icon: <TrendingUp className="h-4 w-4" />, color: 'purple' },
            ].map((stat, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`text-${stat.color}-500`}>
                    {stat.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-green-600 mt-1">{stat.change} from last month</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <Card className="col-span-1 md:col-span-1">
              <CardHeader>
                <CardTitle>Student Enrollment</CardTitle>
                <CardDescription>Monthly enrollment trend</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <BarChart2 className="h-16 w-16 text-muted-foreground/50" />
                <span className="ml-4 text-muted-foreground">Charts will appear here</span>
              </CardContent>
            </Card>

            <Card className="col-span-1 md:col-span-1">
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>By college</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <PieChart className="h-16 w-16 text-muted-foreground/50" />
                <span className="ml-4 text-muted-foreground">Charts will appear here</span>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="financial" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Analytics</CardTitle>
              <CardDescription>Revenue and payment details</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <TrendingUp className="h-16 w-16 text-muted-foreground/50" />
              <span className="ml-4 text-muted-foreground">Financial analytics will appear here</span>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="academic" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Academic Analytics</CardTitle>
              <CardDescription>Student performance and engagement</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <BarChart2 className="h-16 w-16 text-muted-foreground/50" />
              <span className="ml-4 text-muted-foreground">Academic analytics will appear here</span>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAnalytics;
