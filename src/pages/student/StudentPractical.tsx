
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Search, Beaker, FileCheck, ArrowRight, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const StudentPractical: React.FC = () => {
  const practicals = [
    {
      id: 1,
      title: 'Tablet Formulation and Evaluation',
      subject: 'Pharmaceutics Lab',
      date: '15 Jun 2023',
      status: 'completed',
      score: '92%'
    },
    {
      id: 2,
      title: 'Organic Compound Synthesis',
      subject: 'Pharmaceutical Chemistry Lab',
      date: '22 Jun 2023',
      status: 'scheduled',
      time: '10:00 AM'
    },
    {
      id: 3,
      title: 'UV-Visible Spectroscopy',
      subject: 'Pharmaceutical Analysis Lab',
      date: '29 Jun 2023',
      status: 'scheduled',
      time: '2:00 PM'
    },
    {
      id: 4,
      title: 'Drug Receptor Interactions',
      subject: 'Pharmacology Lab',
      date: '05 Jul 2023',
      status: 'scheduled',
      time: '11:30 AM'
    },
    {
      id: 5,
      title: 'Extraction Techniques',
      subject: 'Pharmaceutical Chemistry Lab',
      date: '10 May 2023',
      status: 'completed',
      score: '88%'
    },
    {
      id: 6,
      title: 'Capsule Formulation',
      subject: 'Pharmaceutics Lab',
      date: '03 May 2023',
      status: 'completed',
      score: '95%'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Practical Coursework</h1>
          <p className="text-muted-foreground">
            Your practical laboratory sessions and exercises
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search practicals..."
            className="pl-8 w-full"
          />
        </div>
      </div>

      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Upcoming Practical Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {practicals.filter(p => p.status === 'scheduled').slice(0, 2).map((practical) => (
              <div key={practical.id} className="flex items-start p-4 border rounded-md">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <Beaker className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <h3 className="font-medium">{practical.title}</h3>
                      <p className="text-sm text-muted-foreground">{practical.subject}</p>
                      <div className="flex items-center mt-1">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground mr-1" />
                        <span className="text-xs text-muted-foreground">{practical.date} • {practical.time}</span>
                      </div>
                    </div>
                    <Button size="sm">
                      Prepare
                      <ArrowRight className="ml-2 h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-3 w-full md:w-auto">
          <TabsTrigger value="all">All Practicals</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="space-y-4">
            {practicals.map((practical) => (
              <Card key={practical.id} className="overflow-hidden hover:shadow-sm transition-shadow">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="p-4 flex items-start md:w-3/4">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${
                        practical.status === 'completed' ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        {practical.status === 'completed' ? (
                          <FileCheck className="h-5 w-5 text-green-600" />
                        ) : (
                          <Beaker className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-medium">{practical.title}</h3>
                          <Badge className={practical.status === 'completed' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 'bg-blue-100 text-blue-800 hover:bg-blue-100'}>
                            {practical.status === 'completed' ? 'Completed' : 'Scheduled'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{practical.subject}</p>
                        <div className="flex items-center mt-1">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground mr-1" />
                          <span className="text-xs text-muted-foreground">
                            {practical.date} {practical.time && `• ${practical.time}`}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className={`p-4 md:w-1/4 flex flex-col justify-center items-center ${
                      practical.status === 'completed' ? 'bg-green-50' : 'bg-blue-50'
                    }`}>
                      {practical.status === 'completed' ? (
                        <div className="text-center">
                          <div className="text-xl font-bold text-green-600">{practical.score}</div>
                          <div className="text-xs text-muted-foreground">Score</div>
                          <Button size="sm" variant="outline" className="mt-2">
                            View Report
                          </Button>
                        </div>
                      ) : (
                        <Button>
                          Prepare
                          <ArrowRight className="ml-2 h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="scheduled" className="mt-6">
          <div className="space-y-4">
            {practicals.filter(p => p.status === 'scheduled').map((practical) => (
              <Card key={practical.id} className="overflow-hidden hover:shadow-sm transition-shadow">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="p-4 flex items-start md:w-3/4">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                        <Beaker className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-medium">{practical.title}</h3>
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Scheduled</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{practical.subject}</p>
                        <div className="flex items-center mt-1">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground mr-1" />
                          <span className="text-xs text-muted-foreground">
                            {practical.date} {practical.time && `• ${practical.time}`}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 md:w-1/4 bg-blue-50 flex flex-col justify-center items-center">
                      <Button>
                        Prepare
                        <ArrowRight className="ml-2 h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-6">
          <div className="space-y-4">
            {practicals.filter(p => p.status === 'completed').map((practical) => (
              <Card key={practical.id} className="overflow-hidden hover:shadow-sm transition-shadow">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="p-4 flex items-start md:w-3/4">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                        <FileCheck className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-medium">{practical.title}</h3>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{practical.subject}</p>
                        <div className="flex items-center mt-1">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground mr-1" />
                          <span className="text-xs text-muted-foreground">{practical.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 md:w-1/4 bg-green-50 flex flex-col justify-center items-center">
                      <div className="text-center">
                        <div className="text-xl font-bold text-green-600">{practical.score}</div>
                        <div className="text-xs text-muted-foreground">Score</div>
                        <Button size="sm" variant="outline" className="mt-2">
                          View Report
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentPractical;
