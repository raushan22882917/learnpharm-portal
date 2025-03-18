
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Download, CheckCircle, XCircle, Filter } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

const PrincipalPayments: React.FC = () => {
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);
  
  // Mock payment data
  const payments = [
    { 
      id: 'PAY-1001', 
      studentName: 'Amit Patel', 
      studentId: 'STU-1234',
      amount: 12500, 
      date: '2023-08-15', 
      method: 'Bank Transfer', 
      semester: 'Semester 1 2023-24', 
      status: 'pending',
      transactionId: 'TXN-4829384'
    },
    { 
      id: 'PAY-1002', 
      studentName: 'Priya Sharma', 
      studentId: 'STU-1235',
      amount: 12500, 
      date: '2023-08-16', 
      method: 'UPI', 
      semester: 'Semester 1 2023-24', 
      status: 'approved',
      transactionId: 'TXN-4829385'
    },
    { 
      id: 'PAY-1003', 
      studentName: 'Rajesh Kumar', 
      studentId: 'STU-1236',
      amount: 12500, 
      date: '2023-08-18', 
      method: 'Credit Card', 
      semester: 'Semester 1 2023-24', 
      status: 'rejected',
      transactionId: 'TXN-4829386',
      rejectionReason: 'Invalid payment details'
    },
    { 
      id: 'PAY-1004', 
      studentName: 'Sunita Verma', 
      studentId: 'STU-1237',
      amount: 12500, 
      date: '2023-08-20', 
      method: 'Bank Transfer', 
      semester: 'Semester 1 2023-24', 
      status: 'pending',
      transactionId: 'TXN-4829387'
    }
  ];

  const handleApprovePayment = (payment: any) => {
    // In a real implementation, this would update the payment status in the backend
    toast({
      title: "Payment Approved",
      description: `Payment ${payment.id} for ${payment.studentName} has been approved.`,
    });
    setOpenDialog(false);
  };

  const handleRejectPayment = (payment: any) => {
    // In a real implementation, this would update the payment status in the backend
    toast({
      title: "Payment Rejected",
      description: `Payment ${payment.id} for ${payment.studentName} has been rejected.`,
    });
    setOpenDialog(false);
  };

  const handleViewDetails = (payment: any) => {
    setSelectedPayment(payment);
    setOpenDialog(true);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payment Management</h1>
          <p className="text-muted-foreground">
            Track, approve, and manage student payments
          </p>
        </div>
        
        <Button variant="outline" className="mt-4 md:mt-0">
          <Download className="mr-2 h-4 w-4" /> Export Payments
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search payments..."
            className="pl-8 w-full"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" /> Filters
          </Button>
        </div>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid grid-cols-3 md:w-auto">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {payments
                  .filter(payment => payment.status === 'pending')
                  .map((payment) => (
                    <div key={payment.id} className="flex flex-col md:flex-row justify-between p-4 border rounded-md">
                      <div className="flex flex-col mb-4 md:mb-0">
                        <div className="flex items-center mb-2">
                          <h3 className="font-semibold">{payment.studentName}</h3>
                          <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                            {payment.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">Payment ID: {payment.id}</p>
                        <p className="text-sm text-muted-foreground">Date: {payment.date}</p>
                        <p className="text-sm mt-2">₹{payment.amount.toLocaleString('en-IN')}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-blue-600"
                          onClick={() => handleViewDetails(payment)}
                        >
                          Details
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-green-600"
                          onClick={() => handleApprovePayment(payment)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" /> Approve
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600"
                          onClick={() => handleRejectPayment(payment)}
                        >
                          <XCircle className="h-4 w-4 mr-1" /> Reject
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Approved Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {payments
                  .filter(payment => payment.status === 'approved')
                  .map((payment) => (
                    <div key={payment.id} className="flex flex-col md:flex-row justify-between p-4 border rounded-md">
                      <div className="flex flex-col mb-4 md:mb-0">
                        <div className="flex items-center mb-2">
                          <h3 className="font-semibold">{payment.studentName}</h3>
                          <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                            {payment.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">Payment ID: {payment.id}</p>
                        <p className="text-sm text-muted-foreground">Date: {payment.date}</p>
                        <p className="text-sm mt-2">₹{payment.amount.toLocaleString('en-IN')}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewDetails(payment)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Rejected Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {payments
                  .filter(payment => payment.status === 'rejected')
                  .map((payment) => (
                    <div key={payment.id} className="flex flex-col md:flex-row justify-between p-4 border rounded-md">
                      <div className="flex flex-col mb-4 md:mb-0">
                        <div className="flex items-center mb-2">
                          <h3 className="font-semibold">{payment.studentName}</h3>
                          <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                            {payment.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">Payment ID: {payment.id}</p>
                        <p className="text-sm text-muted-foreground">Date: {payment.date}</p>
                        <p className="text-sm mt-2">₹{payment.amount.toLocaleString('en-IN')}</p>
                        {payment.rejectionReason && (
                          <p className="text-sm text-red-600 mt-1">Reason: {payment.rejectionReason}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewDetails(payment)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payment Details Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
            <DialogDescription>
              Complete information about this payment
            </DialogDescription>
          </DialogHeader>
          
          {selectedPayment && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Payment ID</p>
                  <p className="font-medium">{selectedPayment.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                    selectedPayment.status === 'approved' 
                      ? 'bg-green-100 text-green-800' 
                      : selectedPayment.status === 'pending'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedPayment.status.toUpperCase()}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Student Name</p>
                  <p className="font-medium">{selectedPayment.studentName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Student ID</p>
                  <p className="font-medium">{selectedPayment.studentId}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="font-medium">₹{selectedPayment.amount.toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{selectedPayment.date}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Payment Method</p>
                  <p className="font-medium">{selectedPayment.method}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Semester</p>
                  <p className="font-medium">{selectedPayment.semester}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Transaction ID</p>
                <p className="font-medium">{selectedPayment.transactionId}</p>
              </div>
              
              {selectedPayment.rejectionReason && (
                <div>
                  <p className="text-sm text-muted-foreground">Rejection Reason</p>
                  <p className="font-medium text-red-600">{selectedPayment.rejectionReason}</p>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            {selectedPayment && selectedPayment.status === 'pending' && (
              <>
                <Button 
                  variant="outline" 
                  className="text-red-600"
                  onClick={() => handleRejectPayment(selectedPayment)}
                >
                  <XCircle className="h-4 w-4 mr-1" /> Reject Payment
                </Button>
                <Button 
                  className="text-white"
                  onClick={() => handleApprovePayment(selectedPayment)}
                >
                  <CheckCircle className="h-4 w-4 mr-1" /> Approve Payment
                </Button>
              </>
            )}
            {selectedPayment && selectedPayment.status !== 'pending' && (
              <Button onClick={() => setOpenDialog(false)}>Close</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PrincipalPayments;
