
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

const PrincipalFeedback: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Feedback</h1>
        <p className="text-muted-foreground">
          Submit feedback and view past submissions
        </p>
      </div>

      <Tabs defaultValue="submit" className="w-full">
        <TabsList className="grid grid-cols-2 w-full md:w-auto">
          <TabsTrigger value="submit">Submit Feedback</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="submit" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Submit New Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Feedback Type</label>
                  <div className="flex flex-wrap gap-2">
                    <Button type="button" variant="outline" size="sm">Content Quality</Button>
                    <Button type="button" variant="outline" size="sm">Platform Features</Button>
                    <Button type="button" variant="outline" size="sm">Student Experience</Button>
                    <Button type="button" variant="outline" size="sm">Faculty Concerns</Button>
                    <Button type="button" variant="outline" size="sm">Technical Issues</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Feedback Details</label>
                  <Textarea 
                    placeholder="Please provide details of your feedback or suggestion..." 
                    rows={6}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority Level</label>
                  <div className="flex flex-wrap gap-2">
                    <Button type="button" variant="outline" size="sm">Low</Button>
                    <Button type="button" variant="outline" size="sm">Medium</Button>
                    <Button type="button" variant="outline" size="sm">High</Button>
                    <Button type="button" variant="outline" size="sm">Critical</Button>
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
              <CardTitle>Feedback History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { id: 1, type: 'Content Quality', date: '15 Jun 2023', status: 'Resolved', priority: 'Medium', details: 'The pharmaceutical chemistry content needs more diagrams and visual aids to help students understand complex reactions.' },
                  { id: 2, type: 'Platform Features', date: '03 May 2023', status: 'In Progress', priority: 'Low', details: 'It would be helpful to have a built-in calendar feature that syncs with faculty schedules and exam dates.' },
                  { id: 3, type: 'Technical Issues', date: '22 Apr 2023', status: 'Resolved', priority: 'High', details: 'Students are unable to access the practical content videos. They receive an error when trying to play them.' }
                ].map((feedback) => (
                  <div key={feedback.id} className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium">{feedback.type}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{feedback.date}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            feedback.status === 'Resolved' 
                              ? 'bg-green-100 text-green-800' 
                              : feedback.status === 'In Progress'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {feedback.status}
                          </span>
                        </div>
                        
                        <p className="text-sm">{feedback.details}</p>
                      </div>
                      
                      <div className="mt-4 md:mt-0 flex items-center">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          feedback.priority === 'High' 
                            ? 'bg-red-100 text-red-800' 
                            : feedback.priority === 'Medium'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {feedback.priority} Priority
                        </span>
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

export default PrincipalFeedback;
