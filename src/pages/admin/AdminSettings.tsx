
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Shield, Lock, Eye, Bell, UserCog, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const AdminSettings: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage platform settings and configurations
        </p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-3 md:w-auto">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage basic platform settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input id="platform-name" defaultValue="PharmLearn" className="mt-1" />
                </div>
                
                <div>
                  <Label htmlFor="support-email">Support Email</Label>
                  <Input id="support-email" type="email" defaultValue="support@pharmlearn.com" className="mt-1" />
                </div>
                
                <div>
                  <Label htmlFor="contact-phone">Contact Phone</Label>
                  <Input id="contact-phone" type="tel" defaultValue="+91 98765 43210" className="mt-1" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">Take the platform offline for maintenance</p>
                  </div>
                  <Switch id="maintenance-mode" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="allow-signups">Allow New Signups</Label>
                    <p className="text-sm text-muted-foreground">Enable user registration</p>
                  </div>
                  <Switch id="allow-signups" defaultChecked />
                </div>
              </div>
              
              <Button className="mt-6">
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security and content protection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base" htmlFor="text-protection">Prevent Text Selection</Label>
                    <p className="text-sm text-muted-foreground">Disable text selection on content pages</p>
                  </div>
                  <Switch id="text-protection" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base" htmlFor="right-click">Disable Right-Click</Label>
                    <p className="text-sm text-muted-foreground">Prevent right-click context menu</p>
                  </div>
                  <Switch id="right-click" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base" htmlFor="keyboard-shortcuts">Disable Keyboard Shortcuts</Label>
                    <p className="text-sm text-muted-foreground">Prevent printing and saving with keyboard shortcuts</p>
                  </div>
                  <Switch id="keyboard-shortcuts" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base" htmlFor="watermark">Show Watermark</Label>
                    <p className="text-sm text-muted-foreground">Display watermark on content pages</p>
                  </div>
                  <Switch id="watermark" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base" htmlFor="two-factor">Require Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">For admin and principal accounts</p>
                  </div>
                  <Switch id="two-factor" />
                </div>
              </div>
              
              <Button className="mt-6">
                <Save className="mr-2 h-4 w-4" /> Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure email and in-app notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base" htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send email notifications for important events</p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base" htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Enable browser push notifications</p>
                  </div>
                  <Switch id="push-notifications" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base" htmlFor="student-alerts">Student Alerts</Label>
                    <p className="text-sm text-muted-foreground">Notify students about new content</p>
                  </div>
                  <Switch id="student-alerts" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base" htmlFor="payment-reminders">Payment Reminders</Label>
                    <p className="text-sm text-muted-foreground">Send payment due reminders</p>
                  </div>
                  <Switch id="payment-reminders" defaultChecked />
                </div>
              </div>
              
              <Button className="mt-6">
                <Save className="mr-2 h-4 w-4" /> Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
