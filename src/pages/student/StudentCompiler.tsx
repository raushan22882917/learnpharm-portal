
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Code, Terminal, ChevronDown, BookOpen, Info, Copy, Maximize, Minimize, HelpCircle } from 'lucide-react';

const StudentCompiler: React.FC = () => {
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedScript, setSelectedScript] = useState('script1');

  // Mock data for scripts
  const scripts = {
    script1: {
      title: 'Basic Pharmacy Calculations',
      description: 'Calculate dosages based on patient weight',
      code: `# Pharmacy Calculation Script
# This script calculates dosage based on patient weight

def calculate_dosage(weight_kg, dose_mg_per_kg):
    """
    Calculate the total dose in mg based on patient weight
    and prescribed dose per kg.
    
    Args:
        weight_kg: Patient weight in kilograms
        dose_mg_per_kg: Prescribed dose in mg per kg
        
    Returns:
        Total dose in mg
    """
    return weight_kg * dose_mg_per_kg

# Example patient data
patient_weight = 70  # kg
prescribed_dose = 5  # mg per kg

# Calculate the total dose
total_dose = calculate_dosage(patient_weight, prescribed_dose)

print(f"Patient weight: {patient_weight} kg")
print(f"Prescribed dose: {prescribed_dose} mg/kg")
print(f"Total dose to administer: {total_dose} mg")
`
    },
    script2: {
      title: 'Drug Interaction Checker',
      description: 'Check for potential drug interactions',
      code: `# Drug Interaction Checker
# This script checks for potential interactions between medications

# Database of known drug interactions (simplified)
interactions = {
    ("aspirin", "warfarin"): "Increased risk of bleeding",
    ("simvastatin", "erythromycin"): "Increased risk of myopathy and rhabdomyolysis",
    ("fluoxetine", "tramadol"): "Increased risk of serotonin syndrome",
    ("digoxin", "amiodarone"): "Increased risk of digoxin toxicity"
}

def check_interaction(drug1, drug2):
    """
    Check if there's a known interaction between two drugs
    
    Args:
        drug1: First drug name (lowercase)
        drug2: Second drug name (lowercase)
        
    Returns:
        Interaction warning or None
    """
    # Check both possible orders of the drugs
    if (drug1, drug2) in interactions:
        return interactions[(drug1, drug2)]
    elif (drug2, drug1) in interactions:
        return interactions[(drug2, drug1)]
    else:
        return None

# Example medications
med1 = "aspirin"
med2 = "warfarin"

# Check for interactions
result = check_interaction(med1, med2)

if result:
    print(f"WARNING: Interaction between {med1} and {med2}")
    print(f"Effect: {result}")
else:
    print(f"No known interactions between {med1} and {med2}")
`
    }
  };

  const handleRunScript = () => {
    setIsRunning(true);
    setOutput('');
    
    // Simulate script execution with delayed output
    setTimeout(() => {
      if (selectedScript === 'script1') {
        setOutput(
          "Patient weight: 70 kg\n" +
          "Prescribed dose: 5 mg/kg\n" +
          "Total dose to administer: 350 mg"
        );
      } else if (selectedScript === 'script2') {
        setOutput(
          "WARNING: Interaction between aspirin and warfarin\n" +
          "Effect: Increased risk of bleeding"
        );
      }
      setIsRunning(false);
    }, 1500);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`space-y-8 animate-fade-in ${isFullscreen ? 'fixed inset-0 z-50 bg-background p-6' : ''}`}>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Interactive Scripts</h1>
          <p className="text-muted-foreground">
            Run and experiment with pharmacy calculation scripts
          </p>
        </div>
        
        <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
          {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/4">
          <Card>
            <CardHeader>
              <CardTitle>Available Scripts</CardTitle>
              <CardDescription>Select a script to run</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div 
                  className={`flex items-center p-3 rounded-md cursor-pointer ${
                    selectedScript === 'script1' ? 'bg-primary/10' : 'hover:bg-muted'
                  }`}
                  onClick={() => setSelectedScript('script1')}
                >
                  <Code className={`h-5 w-5 mr-2 ${selectedScript === 'script1' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <div>
                    <p className="font-medium">Basic Pharmacy Calculations</p>
                    <p className="text-xs text-muted-foreground">Dosage calculation script</p>
                  </div>
                </div>
                
                <div 
                  className={`flex items-center p-3 rounded-md cursor-pointer ${
                    selectedScript === 'script2' ? 'bg-primary/10' : 'hover:bg-muted'
                  }`}
                  onClick={() => setSelectedScript('script2')}
                >
                  <Code className={`h-5 w-5 mr-2 ${selectedScript === 'script2' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <div>
                    <p className="font-medium">Drug Interaction Checker</p>
                    <p className="text-xs text-muted-foreground">Checks potential drug interactions</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="h-5 w-5 mr-2 text-muted-foreground" />
                Instructions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-4">
                <p>
                  These interactive scripts demonstrate pharmacy calculations and concepts.
                </p>
                <p>
                  <span className="font-medium">Read-only access:</span> You can view and run the scripts, but cannot modify them.
                </p>
                <p>
                  <span className="font-medium">To run a script:</span> Select a script from the list and click the Run button.
                </p>
                <p>
                  <span className="font-medium">Need help?</span> Click on the Documentation tab to learn more about each script.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="w-full lg:w-3/4">
          <Tabs defaultValue="code" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="code">Code</TabsTrigger>
                <TabsTrigger value="documentation">Documentation</TabsTrigger>
              </TabsList>
              
              <Button onClick={handleRunScript} disabled={isRunning}>
                {isRunning ? (
                  <>
                    <span className="animate-spin mr-2">◌</span> Running...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" /> Run Script
                  </>
                )}
              </Button>
            </div>
            
            <TabsContent value="code">
              <Card>
                <CardHeader className="py-3">
                  <div className="flex justify-between items-center">
                    <CardTitle>{scripts[selectedScript as keyof typeof scripts].title}</CardTitle>
                    <Button variant="ghost" size="icon">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="rounded-md border bg-muted/50">
                    <pre className="text-sm overflow-x-auto p-4 h-96 whitespace-pre-wrap font-mono text-slate-900">
                      <code>{scripts[selectedScript as keyof typeof scripts].code}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
              
              {/* Terminal Output */}
              <div className="mt-6">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Terminal className="h-4 w-4 mr-1" /> Output
                </div>
                <div className="rounded-md border bg-black p-4 font-mono text-white text-sm h-48 overflow-y-auto">
                  {output ? (
                    <pre>{output}</pre>
                  ) : (
                    <div className="text-gray-500">
                      {isRunning ? "Running script..." : "Run the script to see output here"}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="documentation">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    {scripts[selectedScript as keyof typeof scripts].title} Documentation
                  </CardTitle>
                  <CardDescription>
                    Learn how to use this script and understand its functionality
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Overview</h3>
                    <p className="text-muted-foreground mt-1">
                      {selectedScript === 'script1' 
                        ? "This script demonstrates how to calculate medication dosages based on patient weight. It applies the formula: Total Dose = Patient Weight (kg) × Prescribed Dose (mg/kg)."
                        : "This script demonstrates how to check for potential drug interactions between two medications. It uses a simplified database of known drug interactions."}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">Functions</h3>
                    <div className="mt-2 border rounded-md p-4 bg-muted/30">
                      <h4 className="font-medium">
                        {selectedScript === 'script1' ? "calculate_dosage(weight_kg, dose_mg_per_kg)" : "check_interaction(drug1, drug2)"}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {selectedScript === 'script1' 
                          ? "Calculates the total dose based on patient weight and prescribed dose per kg."
                          : "Checks if there's a known interaction between two drugs in the database."}
                      </p>
                      <div className="mt-2">
                        <p className="text-sm font-medium">Parameters:</p>
                        <ul className="text-sm text-muted-foreground list-disc pl-5 mt-1">
                          {selectedScript === 'script1' ? (
                            <>
                              <li>weight_kg: Patient weight in kilograms</li>
                              <li>dose_mg_per_kg: Prescribed dose in mg per kg</li>
                            </>
                          ) : (
                            <>
                              <li>drug1: First drug name (lowercase)</li>
                              <li>drug2: Second drug name (lowercase)</li>
                            </>
                          )}
                        </ul>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm font-medium">Returns:</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {selectedScript === 'script1' 
                            ? "Total dose in mg"
                            : "Interaction warning or None if no interaction is found"}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                    <div className="flex items-start">
                      <Info className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800">Educational Purpose</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          This script is for educational purposes only. In real clinical practice, healthcare professionals must verify all calculations and use approved drug information resources.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default StudentCompiler;
