import { useState, useEffect } from "react";
import { 
  generateStudentData, 
  addMLPredictions, 
  assignLearningPersonas, 
  calculateCorrelations,
  getLearningPersonaStats,
  Student,
  SkillCorrelation,
  LearningPersona
} from "@/data/studentData";
import { OverviewStats } from "./OverviewStats";
import { SkillPerformanceChart } from "./SkillPerformanceChart";
import { AttentionPerformanceScatter } from "./AttentionPerformanceScatter";
import { StudentRadarProfile } from "./StudentRadarProfile";
import { StudentsTable } from "./StudentsTable";
import { InsightsSection } from "./InsightsSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Users, Brain, Table, Lightbulb } from "lucide-react";

export const Dashboard = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [correlations, setCorrelations] = useState<SkillCorrelation[]>([]);
  const [personas, setPersonas] = useState<LearningPersona[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setIsLoading(true);
      
      // Generate synthetic data
      let studentData = generateStudentData();
      
      // Add ML predictions
      studentData = addMLPredictions(studentData);
      
      // Assign learning personas
      studentData = assignLearningPersonas(studentData);
      
      // Calculate correlations
      const skillCorrelations = calculateCorrelations(studentData);
      
      // Get persona statistics
      const personaStats = getLearningPersonaStats(studentData);
      
      setStudents(studentData);
      setCorrelations(skillCorrelations);
      setPersonas(personaStats);
      setIsLoading(false);
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-education-blue mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading student performance data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-education-blue to-education-teal bg-clip-text text-transparent">
                Student Performance Dashboard
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                AI-Powered Learning Analytics & Insights
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-education-blue/10 text-education-blue">
                ML Enabled
              </Badge>
              <Badge variant="secondary">
                {students.length} Students
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-fit">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="profiles" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Profiles
            </TabsTrigger>
            <TabsTrigger value="table" className="flex items-center gap-2">
              <Table className="h-4 w-4" />
              Students
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <OverviewStats students={students} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SkillPerformanceChart students={students} />
              <AttentionPerformanceScatter students={students} />
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SkillPerformanceChart students={students} />
              <AttentionPerformanceScatter students={students} />
            </div>
            <StudentRadarProfile students={students} />
          </TabsContent>

          <TabsContent value="profiles" className="space-y-6">
            <StudentRadarProfile students={students} />
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Learning Persona Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {personas.map((persona, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{persona.name}</h3>
                        <Badge style={{ backgroundColor: persona.color }} className="text-white">
                          {persona.count}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{persona.description}</p>
                      <div className="space-y-1">
                        {persona.characteristics.map((char, charIndex) => (
                          <div key={charIndex} className="text-xs bg-muted/50 px-2 py-1 rounded">
                            {char}
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 text-sm">
                        <span className="text-muted-foreground">Avg Score: </span>
                        <span className="font-semibold">{persona.avgScore}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="table" className="space-y-6">
            <StudentsTable students={students} />
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <InsightsSection 
              students={students} 
              correlations={correlations} 
              personas={personas} 
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};