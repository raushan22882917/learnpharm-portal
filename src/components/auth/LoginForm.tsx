
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { LockKeyhole, UserCircle, Mail, ShieldCheck } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type UserRole = 'admin' | 'principal' | 'faculty' | 'student';

const roleRedirects: Record<UserRole, string> = {
  'admin': '/admin',
  'principal': '/principal',
  'faculty': '/faculty',
  'student': '/student'
};

const LoginForm: React.FC = () => {
  const { login, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [role, setRole] = useState<UserRole>('student');
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      await login(values.email, values.password);
      toast({
        title: "Login successful",
        description: `Welcome to PharmLearn`,
      });
      navigate(roleRedirects[role]);
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const getRoleIcon = (userRole: UserRole) => {
    switch (userRole) {
      case 'admin':
        return <ShieldCheck className="h-4 w-4" />;
      case 'principal':
        return <UserCircle className="h-4 w-4" />;
      case 'faculty':
        return <UserCircle className="h-4 w-4" />;
      case 'student':
        return <UserCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto glass-card border-0 animate-fade-in">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
        <CardDescription>
          Choose your role and enter your credentials to access the platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="student" onValueChange={(value) => setRole(value as UserRole)} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="student" className="flex items-center gap-1">
              {getRoleIcon('student')}
              <span className="hidden sm:inline">Student</span>
            </TabsTrigger>
            <TabsTrigger value="faculty" className="flex items-center gap-1">
              {getRoleIcon('faculty')}
              <span className="hidden sm:inline">Faculty</span>
            </TabsTrigger>
            <TabsTrigger value="principal" className="flex items-center gap-1">
              {getRoleIcon('principal')}
              <span className="hidden sm:inline">Principal</span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-1">
              {getRoleIcon('admin')}
              <span className="hidden sm:inline">Admin</span>
            </TabsTrigger>
          </TabsList>
          
          {['student', 'faculty', 'principal', 'admin'].map((roleValue) => (
            <TabsContent key={roleValue} value={roleValue}>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input 
                              placeholder="email@example.com" 
                              className="pl-10" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <LockKeyhole className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input 
                              placeholder="••••••••" 
                              type="password" 
                              className="pl-10" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading || authLoading}>
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <p className="text-xs text-center text-muted-foreground px-4">
          For demo purposes, use any email and password with minimum 6 characters
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
