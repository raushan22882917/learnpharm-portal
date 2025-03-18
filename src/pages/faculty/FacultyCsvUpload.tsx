
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, AlertTriangle, Check, X, FileSpreadsheet, User, Users } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const FacultyCsvUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<any[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFileSelection(files[0]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileSelection = (selectedFile: File) => {
    if (selectedFile && selectedFile.name.endsWith('.csv')) {
      setFile(selectedFile);
      simulateCsvParsing(selectedFile);
      setIsCompleted(false);
      setValidationErrors([]);
    } else {
      toast({
        title: "Invalid File Format",
        description: "Please upload a CSV file",
        variant: "destructive",
      });
    }
  };

  const simulateCsvParsing = (file: File) => {
    // In a real implementation, you would parse the CSV file
    // For this example, we'll generate mock data
    setTimeout(() => {
      const mockData = [
        { id: 1, name: 'Amit Patel', email: 'amit@example.com', semester: 'Semester 1 2023-24', enrollmentNo: 'B123456', status: 'valid' },
        { id: 2, name: 'Priya Sharma', email: 'priya@example.com', semester: 'Semester 1 2023-24', enrollmentNo: 'B123457', status: 'valid' },
        { id: 3, name: 'Rajesh Kumar', email: 'rajesh@example.com', semester: 'Semester 1 2023-24', enrollmentNo: 'B123458', status: 'valid' },
        { id: 4, name: 'Invalid Student', email: 'invalid-email', semester: 'Unknown Semester', enrollmentNo: 'XXX', status: 'invalid' },
      ];
      
      setPreview(mockData);
      const errors = mockData
        .filter(student => student.status === 'invalid')
        .map(student => `Invalid data for student at line ${student.id}: ${student.name}`);
      
      setValidationErrors(errors);
    }, 1000);
  };

  const handleClearSelection = () => {
    setFile(null);
    setPreview([]);
    setValidationErrors([]);
    setIsCompleted(false);
  };

  const handleUpload = () => {
    if (validationErrors.length > 0) {
      toast({
        title: "Validation errors",
        description: "Please fix all validation errors before uploading",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      setIsCompleted(true);
      toast({
        title: "Upload Successful",
        description: `${preview.filter(student => student.status === 'valid').length} students have been uploaded successfully`,
      });
    }, 2000);
  };

  const handleDownloadTemplate = () => {
    // In a real implementation, this would generate a CSV template for download
    toast({
      title: "Template Downloaded",
      description: "The CSV template has been downloaded successfully",
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Student Upload</h1>
        <p className="text-muted-foreground">
          Add multiple students to the system by uploading a CSV file
        </p>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="upload">CSV Upload</TabsTrigger>
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="mt-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Upload Students via CSV</CardTitle>
              <CardDescription>
                Add multiple students to the system by uploading a CSV file with the student data
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!file ? (
                <div 
                  className={`border-2 border-dashed rounded-md p-8 text-center ${
                    isDragging ? 'border-primary bg-primary/5' : 'border-gray-200'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center justify-center">
                    <FileSpreadsheet className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      Drop your CSV file here, or <span className="text-primary cursor-pointer">browse</span>
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Supports CSV files up to 5MB
                    </p>
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <div className="flex gap-4">
                      <Button 
                        variant="outline" 
                        onClick={() => document.getElementById('file-upload')?.click()}
                      >
                        <Upload className="mr-2 h-4 w-4" /> Select File
                      </Button>
                      <Button variant="outline" onClick={handleDownloadTemplate}>
                        Download Template
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-between items-center bg-gray-50 p-4 rounded-md">
                    <div className="flex items-center">
                      <FileSpreadsheet className="h-8 w-8 text-primary mr-3" />
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(file.size / 1024).toFixed(2)} KB • {preview.length} students
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={handleClearSelection}
                      disabled={isUploading}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  {validationErrors.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-4">
                      <div className="flex items-start">
                        <AlertTriangle className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-red-800">Validation Issues</h4>
                          <p className="text-sm text-red-700 mb-2">
                            Please fix the following issues before uploading:
                          </p>
                          <ul className="text-sm text-red-700 list-disc pl-5">
                            {validationErrors.map((error, index) => (
                              <li key={index}>{error}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="border rounded-md">
                    <div className="bg-gray-50 py-3 px-4 text-sm font-medium text-gray-700 border-b">
                      Preview ({preview.filter(s => s.status === 'valid').length} valid students)
                    </div>
                    <div className="divide-y max-h-72 overflow-y-auto">
                      {preview.map((student) => (
                        <div 
                          key={student.id} 
                          className={`flex justify-between items-center py-3 px-4 ${
                            student.status === 'invalid' ? 'bg-red-50' : ''
                          }`}
                        >
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                              <User className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-sm text-muted-foreground">{student.email}</p>
                            </div>
                          </div>
                          <div className="text-sm text-right">
                            <p>{student.semester}</p>
                            <p className="text-muted-foreground">{student.enrollmentNo}</p>
                          </div>
                          {student.status === 'invalid' && (
                            <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                              Invalid
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {isCompleted && (
                    <div className="bg-green-50 border border-green-200 rounded-md p-4">
                      <div className="flex items-center">
                        <Check className="h-5 w-5 text-green-600 mr-2" />
                        <div>
                          <h4 className="font-medium text-green-800">Upload Complete</h4>
                          <p className="text-sm text-green-700">
                            {preview.filter(s => s.status === 'valid').length} students have been successfully uploaded
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <div className="flex justify-between items-center w-full">
                <div className="text-sm text-muted-foreground">
                  <Users className="h-4 w-4 inline-block mr-1" />
                  {file ? (
                    <span>
                      {preview.filter(s => s.status === 'valid').length} valid students ready to upload
                    </span>
                  ) : (
                    "No file selected"
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleClearSelection}
                    disabled={!file || isUploading}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUpload}
                    disabled={!file || validationErrors.length > 0 || isUploading || isCompleted}
                  >
                    {isUploading ? (
                      <>
                        <span className="animate-spin mr-2">◌</span> Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" /> Upload
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="manual" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Manual Student Entry</CardTitle>
              <CardDescription>
                Add students one by one by filling out the form
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="py-8 text-center text-muted-foreground">
                <p>Use this method to add individual students</p>
                <Button className="mt-4">
                  <User className="mr-2 h-4 w-4" /> Add New Student
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FacultyCsvUpload;
