import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Student } from "@/data/studentData";
import { TrendingUp, Users, BookOpen, Clock } from "lucide-react";

interface OverviewStatsProps {
  students: Student[];
}

export const OverviewStats = ({ students }: OverviewStatsProps) => {
  const avgAssessmentScore = Math.round(
    students.reduce((sum, s) => sum + s.assessment_score, 0) / students.length
  );
  
  const avgEngagementTime = Math.round(
    students.reduce((sum, s) => sum + s.engagement_time, 0) / students.length
  );
  
  const avgSkillScore = Math.round(
    students.reduce((sum, s) => sum + (s.comprehension + s.attention + s.focus + s.retention) / 4, 0) / students.length
  );
  
  const highPerformers = students.filter(s => s.assessment_score >= 80).length;
  const highPerformerPercentage = Math.round((highPerformers / students.length) * 100);

  const stats = [
    {
      title: "Average Assessment Score",
      value: `${avgAssessmentScore}%`,
      description: `${highPerformerPercentage}% scoring 80+`,
      icon: TrendingUp,
      color: "education-blue"
    },
    {
      title: "Total Students",
      value: students.length.toString(),
      description: `${new Set(students.map(s => s.class)).size} classes`,
      icon: Users,
      color: "education-teal"
    },
    {
      title: "Average Cognitive Skills",
      value: `${avgSkillScore}%`,
      description: "Comprehension, attention, focus, retention",
      icon: BookOpen,
      color: "education-green"
    },
    {
      title: "Average Engagement",
      value: `${avgEngagementTime}min`,
      description: "Daily learning time",
      icon: Clock,
      color: "education-orange"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="shadow-card hover:shadow-hover transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className={`h-5 w-5 text-${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};