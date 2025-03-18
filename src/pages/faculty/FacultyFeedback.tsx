
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const FacultyFeedback: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Feedback</h1>
        <p className="text-muted-foreground">
          Submit feedback and view past submissions
        </p>
      </div>

      <Tabs defaultValue="submit" className="w-full">
        <TabsList className="grid grid-cols-3 w-full md:w-auto">
          <TabsTrigger value="submit">Submit Feedback</TabsTrigger>
          <TabsTrigger value="history">My Feedback</TabsTrigger>
          <TabsTrigger value="student">Student Feedback</TabsTrigger>
        </TabsList>
        
        <TabsContent value="submit" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Submit Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Feedback Type</label>
                  <div className="flex flex-wrap gap-2">
                    <Button type="button" variant="outline" size="sm">Content Issues</Button>
                    <Button type="button" variant="outline" size="sm">Student Performance</Button>
                    <Button type="button" variant="outline" size="sm">Platform Features</Button>
                    <Button type="button" variant="outline" size="sm">Technical Problems</Button>
                    <Button type="button" variant="outline" size="sm">Suggestions</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject (Optional)</label>
                  <div className="flex flex-wrap gap-2">
                    <Button type="button" variant="outline" size="sm">Pharmaceutical Chemistry</Button>
                    <Button type="button" variant="outline" size="sm">Pharmacology</Button>
                    <Button type="button" variant="outline" size="sm">Medicinal Chemistry</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Feedback Details</label>
                  <Textarea 
                    placeholder="Please provide details of your feedback..." 
                    rows={5}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority Level</label>
                  <div className="flex flex-wrap gap-2">
                    <Button type="button" variant="outline" size="sm">Low</Button>
                    <Button type="button" variant="outline" size="sm">Medium</Button>
                    <Button type="button" variant="outline" size="sm">High</Button>
                  </div>
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
              <div className="space-y-4">
                {[
                  { id: 1, type: 'Content Issues', subject: 'Pharmacology', date: '10 May 2023', status: 'Under Review', details: 'The autonomic nervous system content needs better illustrations. Current diagrams are confusing for students.' },
                  { id: 2, type: 'Platform Features', subject: 'General', date: '22 Apr 2023', status: 'Resolved', details: 'Request for a feature to track student attendance directly from the dashboard.' },
                  { id: 3, type: 'Technical Problems', subject: 'Pharmaceutical Chemistry', date: '15 Apr 2023', status: 'In Progress', details: 'Videos in Chemical Bonding section do not play properly on mobile devices.' }
                ].map((feedback) => (
                  <div key={feedback.id} className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium">{feedback.type}</span>
                          {feedback.subject !== 'General' && (
                            <>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs">{feedback.subject}</span>
                            </>
                          )}
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{feedback.date}</span>
                          <Badge className={`${
                            feedback.status === 'Resolved' 
                              ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                              : feedback.status === 'In Progress'
                              ? 'bg-blue-100 text-blue-800 hover:bg-blue-100'
                              : 'bg-amber-100 text-amber-800 hover:bg-amber-100'
                          }`}>
                            {feedback.status}
                          </Badge>
                        </div>
                        
                        <p className="text-sm">{feedback.details}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="student" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 1, student: 'Anonymous', subject: 'Pharmacology', date: '12 May 2023', details: 'The video lectures are very helpful, but would be better with more examples.' },
                  { id: 2, student: 'Anonymous', subject: 'Pharmaceutical Chemistry', date: '08 May 2023', details: 'The MCQs are too difficult compared to what was covered in the lectures.' },
                  { id: 3, student: 'Anonymous', subject: 'Medicinal Chemistry', date: '05 May 2023', details: 'Could we have more interactive diagrams for chemical structures? It would help with understanding.' }
                ].map((feedback) => (
                  <div key={feedback.id} className="border rounded-lg p-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium">{feedback.subject}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{feedback.date}</span>
                      </div>
                      
                      <p className="text-sm">{feedback.details}</p>
                      
                      <div className="mt-3">
                        <Button variant="outline" size="sm">Acknowledge</Button>
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

export default FacultyFeedback;
