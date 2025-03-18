
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Building, Image, Link as LinkIcon, Save, Facebook, Twitter, Linkedin } from 'lucide-react';

const PrincipalCollege: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">College Profile</h1>
        <p className="text-muted-foreground">
          Manage your college information and details
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>College Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="college-name">College Name</Label>
                <Input id="college-name" defaultValue="College of Pharmacy Sciences" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="college-description">Description</Label>
                <Textarea 
                  id="college-description" 
                  rows={4}
                  defaultValue="Our college is dedicated to excellence in pharmacy education, research, and practice. We provide a comprehensive learning environment for aspiring pharmacists."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="established">Established Year</Label>
                <Input id="established" defaultValue="1985" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" defaultValue="Mumbai, India" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <div className="relative">
                  <LinkIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="website" className="pl-8" defaultValue="https://www.collegeofpharmacy.edu" />
                </div>
              </div>
              
              <Button className="w-full mt-4">
                <Save className="mr-2 h-4 w-4" /> Save Information
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>College Logo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center">
                <div className="h-32 w-32 rounded-md border-2 border-dashed border-muted-foreground/25 flex items-center justify-center mb-4">
                  <Building className="h-12 w-12 text-muted-foreground/50" />
                </div>
                <Button variant="outline" className="mb-2">
                  <Image className="mr-2 h-4 w-4" /> Upload Logo
                </Button>
                <p className="text-xs text-muted-foreground">
                  Recommended size: 200x200px. Max file size: 2MB.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="relative">
                  <Facebook className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-600" />
                  <Input className="pl-8" placeholder="Facebook URL" defaultValue="https://facebook.com/collegepharmacy" />
                </div>
                
                <div className="relative">
                  <Twitter className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-400" />
                  <Input className="pl-8" placeholder="Twitter URL" defaultValue="https://twitter.com/collegepharmacy" />
                </div>
                
                <div className="relative">
                  <Linkedin className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-700" />
                  <Input className="pl-8" placeholder="LinkedIn URL" defaultValue="https://linkedin.com/company/collegepharmacy" />
                </div>
                
                <Button className="w-full mt-2">
                  <Save className="mr-2 h-4 w-4" /> Save Social Links
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrincipalCollege;
