
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, GraduationCap, CreditCard, Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FeedbackForm from '@/components/ui-elements/FeedbackForm';

const PrincipalDashboard: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Faculty Members',
      value: '32',
      description: 'Active teaching staff',
      icon: <Users className="h-5 w-5 text-blue-600" />,
      onClick: () => navigate('/principal/faculty')
    },
    {
      title: 'Students',
      value: '850',
      description: 'Enrolled students',
      icon: <GraduationCap className="h-5 w-5 text-green-600" />,
      onClick: () => navigate('/principal/students')
    },
    {
      title: 'Payment Status',
      value: '92%',
      description: 'Collection rate',
      icon: <CreditCard className="h-5 w-5 text-amber-600" />,
      onClick: () => navigate('/principal/students')
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Principal Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your college, faculty, and student settings.
        </p>
      </div>

      <Card className="dashboard-card overflow-hidden">
        <div className="md:flex">
          <div className="p-6 md:w-2/3">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">College of Pharmacy Sciences</h2>
                <p className="text-muted-foreground">Established 1985 • Mumbai, India</p>
              </div>
            </div>
            
            <p className="mb-4">
              Our college is dedicated to excellence in pharmacy education, research, and practice. We provide a comprehensive learning environment for aspiring pharmacists.
            </p>
            
            <Button variant="outline" onClick={() => navigate('/principal/college')}>
              Edit College Profile
            </Button>
          </div>
          
          <div className="md:w-1/3 bg-gradient-to-br from-primary/10 to-blue-400/10 p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold">B+</div>
              <div className="text-sm text-muted-foreground">NAAC Accreditation</div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
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

      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { 
                title: "New Faculty Application", 
                description: "Dr. Priya Sharma has applied for the Pharmacology department position", 
                time: "2 hours ago",
                type: "faculty" 
              },
              { 
                title: "Payment Update", 
                description: "78 students have completed their fees for the current semester", 
                time: "1 day ago",
                type: "payment" 
              },
              { 
                title: "Content Update", 
                description: "New learning materials have been added for B.Pharm 2nd year students", 
                time: "2 days ago",
                type: "content" 
              }
            ].map((notification, i) => (
              <div key={i} className="flex items-start pb-4 border-b last:border-0 last:pb-0">
                <div className={`h-2 w-2 rounded-full mt-2 mr-3 ${
                  notification.type === 'faculty' ? 'bg-blue-500' : 
                  notification.type === 'payment' ? 'bg-green-500' : 'bg-amber-500'
                }`}></div>
                <div>
                  <p className="text-sm font-medium">{notification.title}</p>
                  <p className="text-sm text-muted-foreground">{notification.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
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

export default PrincipalDashboard;
