
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const StudentFeedback: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Feedback</h1>
        <p className="text-muted-foreground">
          Submit feedback on your courses and learning materials
        </p>
      </div>

      <Tabs defaultValue="submit" className="w-full">
        <TabsList className="grid grid-cols-2 w-full md:w-auto">
          <TabsTrigger value="submit">Submit Feedback</TabsTrigger>
          <TabsTrigger value="history">My Feedback</TabsTrigger>
        </TabsList>
        
        <TabsContent value="submit" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Submit Course Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <div className="flex flex-wrap gap-2">
                    <Button type="button" variant="outline" size="sm">Pharmaceutical Chemistry</Button>
                    <Button type="button" variant="outline" size="sm">Pharmacology</Button>
                    <Button type="button" variant="outline" size="sm">Pharmaceutics</Button>
                    <Button type="button" variant="outline" size="sm">Pharmaceutical Analysis</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Feedback Type</label>
                  <div className="flex flex-wrap gap-2">
                    <Button type="button" variant="outline" size="sm">Course Content</Button>
                    <Button type="button" variant="outline" size="sm">Teaching Method</Button>
                    <Button type="button" variant="outline" size="sm">Study Materials</Button>
                    <Button type="button" variant="outline" size="sm">Platform Features</Button>
                    <Button type="button" variant="outline" size="sm">Technical Issues</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Feedback</label>
                  <Textarea 
                    placeholder="Please provide your feedback or suggestions..." 
                    rows={5}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Rate Your Experience</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <Button key={rating} type="button" variant="outline" size="sm" className="w-10 h-10">
                        {rating}
                      </Button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">1 = Poor, 5 = Excellent</p>
                </div>
                
                <Button className="mt-4">Submit Feedback</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>My Previous Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { id: 1, subject: 'Pharmaceutical Chemistry', type: 'Course Content', date: '10 May 2023', status: 'Acknowledged', message: 'The heterocyclic compounds section needs more examples to understand the concepts clearly.' },
                  { id: 2, subject: 'Pharmacology', type: 'Study Materials', date: '28 Apr 2023', status: 'Under Review', message: 'The drug interaction tables are very helpful, but could use some color coding to make them easier to understand.' },
                  { id: 3, subject: 'Platform Features', type: 'Technical Issues', date: '15 Apr 2023', status: 'Resolved', message: 'Practical videos are buffering too much and sometimes fail to load completely on mobile devices.' }
                ].map((feedback) => (
                  <div key={feedback.id} className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="text-sm font-medium">{feedback.subject}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs">{feedback.type}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{feedback.date}</span>
                          <Badge className={`${
                            feedback.status === 'Resolved' 
                              ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                              : feedback.status === 'Acknowledged'
                              ? 'bg-blue-100 text-blue-800 hover:bg-blue-100'
                              : 'bg-amber-100 text-amber-800 hover:bg-amber-100'
                          }`}>
                            {feedback.status}
                          </Badge>
                        </div>
                        
                        <p className="text-sm">{feedback.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentFeedback;
