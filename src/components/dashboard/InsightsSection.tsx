import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Student, SkillCorrelation, LearningPersona } from "@/data/studentData";
import { TrendingUp, Users, AlertTriangle, Lightbulb } from "lucide-react";

interface InsightsSectionProps {
  students: Student[];
  correlations: SkillCorrelation[];
  personas: LearningPersona[];
}

export const InsightsSection = ({ students, correlations, personas }: InsightsSectionProps) => {
  const totalStudents = students.length;
  const avgScore = Math.round(students.reduce((sum, s) => sum + s.assessment_score, 0) / totalStudents);
  const strugglingStudents = students.filter(s => s.assessment_score < 60).length;
  const highPerformers = students.filter(s => s.assessment_score >= 80).length;
  
  const topSkill = correlations[0];
  const lowestEngagement = Math.min(...students.map(s => s.engagement_time));
  const highestEngagement = Math.max(...students.map(s => s.engagement_time));
  
  const insights = [
    {
      type: "success",
      icon: TrendingUp,
      title: "Strong Performance Correlation",
      description: `${topSkill.skill} shows the highest correlation (${topSkill.correlation}) with assessment scores. Students with strong ${topSkill.skill.toLowerCase()} consistently perform better.`,
      action: `Focus on ${topSkill.skill.toLowerCase()} development programs`
    },
    {
      type: "info",
      icon: Users,
      title: "Learning Persona Distribution",
      description: `${personas[0].name} represents the largest group (${personas[0].count} students, ${Math.round((personas[0].count/totalStudents)*100)}%) with an average score of ${personas[0].avgScore}%.`,
      action: "Tailor teaching strategies for dominant personas"
    },
    {
      type: "warning",
      icon: AlertTriangle,
      title: "Students Needing Support",
      description: `${strugglingStudents} students (${Math.round((strugglingStudents/totalStudents)*100)}%) are scoring below 60%. These students may benefit from additional support and intervention.`,
      action: "Implement targeted support programs"
    },
    {
      type: "insight",
      icon: Lightbulb,
      title: "Engagement Time Variance",
      description: `Engagement time varies significantly from ${lowestEngagement} to ${highestEngagement} minutes. Higher engagement correlates with better performance across all cognitive skills.`,
      action: "Develop strategies to increase engagement time"
    }
  ];

  const getInsightStyle = (type: string) => {
    switch (type) {
      case "success":
        return "border-l-4 border-performance-excellent bg-performance-excellent/5";
      case "warning":
        return "border-l-4 border-performance-average bg-performance-average/5";
      case "info":
        return "border-l-4 border-education-blue bg-education-blue/5";
      case "insight":
        return "border-l-4 border-education-purple bg-education-purple/5";
      default:
        return "border-l-4 border-muted";
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "success":
        return "text-performance-excellent";
      case "warning":
        return "text-performance-average";
      case "info":
        return "text-education-blue";
      case "insight":
        return "text-education-purple";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Key Insights & Recommendations</CardTitle>
          <p className="text-sm text-muted-foreground">
            Data-driven insights from ML analysis of student performance patterns
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div key={index} className={`p-4 rounded-lg ${getInsightStyle(insight.type)}`}>
                <div className="flex items-start space-x-3">
                  <Icon className={`h-5 w-5 mt-0.5 ${getIconColor(insight.type)}`} />
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">{insight.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                    <Badge variant="secondary" className="text-xs">
                      💡 {insight.action}
                    </Badge>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Skill Correlations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {correlations.map((correlation, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{correlation.skill}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-education-blue"
                        style={{ width: `${Math.abs(correlation.correlation) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-12">
                      {correlation.correlation.toFixed(2)}
                    </span>
                    <Badge 
                      variant={correlation.impact === 'High' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {correlation.impact}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Learning Personas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {personas.map((persona, index) => (
                <div key={index} className="p-3 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{persona.name}</span>
                    <Badge style={{ backgroundColor: persona.color }} className="text-white text-xs">
                      {persona.count} students
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{persona.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Avg Score:</span>
                    <span className="font-medium">{persona.avgScore}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};