
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, BookOpen, CalendarClock, FileCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FeedbackForm from '@/components/ui-elements/FeedbackForm';

const FacultyDashboard: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Assigned Students',
      value: '185',
      description: 'Across all semesters',
      icon: <GraduationCap className="h-5 w-5 text-blue-600" />,
      onClick: () => navigate('/faculty/students')
    },
    {
      title: 'Subjects',
      value: '3',
      description: 'Currently teaching',
      icon: <BookOpen className="h-5 w-5 text-green-600" />,
      onClick: () => navigate('/faculty/content')
    },
    {
      title: 'Upcoming Sessions',
      value: '8',
      description: 'This week',
      icon: <CalendarClock className="h-5 w-5 text-amber-600" />,
      onClick: () => navigate('/faculty/schedule')
    },
    {
      title: 'Content Updates',
      value: '12',
      description: 'Pending review',
      icon: <FileCheck className="h-5 w-5 text-purple-600" />,
      onClick: () => navigate('/faculty/content')
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Faculty Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your students and course content.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="dashboard-card col-span-1 md:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/faculty/students/add')}>
                <GraduationCap className="mr-2 h-4 w-4" />
                Assign New Students
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/faculty/content')}>
                <BookOpen className="mr-2 h-4 w-4" />
                Manage Course Content
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/faculty/feedback')}>
                <FileCheck className="mr-2 h-4 w-4" />
                Submit Feedback
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card col-span-1 md:col-span-1">
          <CardHeader>
            <CardTitle>My Teaching Schedule</CardTitle>
            <CardDescription>Upcoming classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { subject: "Pharmaceutical Chemistry", time: "Monday, 10:00 AM", class: "B.Pharm 2nd Year" },
                { subject: "Pharmacology Lab", time: "Tuesday, 2:00 PM", class: "B.Pharm 3rd Year" },
                { subject: "Medicinal Chemistry", time: "Thursday, 9:00 AM", class: "B.Pharm 2nd Year" }
              ].map((session, i) => (
                <div key={i} className="flex items-start pb-3 last:pb-0 border-b last:border-0">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3"></div>
                  <div>
                    <p className="text-sm font-medium">{session.subject}</p>
                    <p className="text-xs text-muted-foreground">{session.time}</p>
                    <p className="text-xs text-muted-foreground">{session.class}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Content Updates Needed</CardTitle>
          <CardDescription>Material that requires your attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { 
                title: "Pharmaceutical Chemistry - Week 3", 
                description: "MCQs need to be updated for recent syllabus changes", 
                priority: "high"
              },
              { 
                title: "Pharmacology - Practical Guidelines", 
                description: "Lab instructions need review before next session", 
                priority: "medium"
              },
              { 
                title: "Medicinal Chemistry - Reference Materials", 
                description: "New journal articles to be added to reading list", 
                priority: "low"
              }
            ].map((update, i) => (
              <div key={i} className="flex items-start pb-4 border-b last:border-0 last:pb-0">
                <div className={`h-2 w-2 rounded-full mt-2 mr-3 ${
                  update.priority === 'high' ? 'bg-red-500' : 
                  update.priority === 'medium' ? 'bg-amber-500' : 'bg-green-500'
                }`}></div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">{update.title}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      update.priority === 'high' ? 'bg-red-100 text-red-800' : 
                      update.priority === 'medium' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {update.priority.charAt(0).toUpperCase() + update.priority.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{update.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="hidden md:block">
        <FeedbackForm />
      </div>
      
      <div className="md:hidden">
        <FeedbackForm compact />
      </div>
    </div>
  );
};

export default FacultyDashboard;
