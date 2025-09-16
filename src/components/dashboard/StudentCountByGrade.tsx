import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Student } from "@/data/studentData";
import { Users, TrendingUp, TrendingDown } from "lucide-react";

interface StudentCountByGradeProps {
  students: Student[];
}

export const StudentCountByGrade = ({ students }: StudentCountByGradeProps) => {
  // Count students by class/grade
  const gradeCounts = students.reduce((acc, student) => {
    const grade = student.class;
    if (!acc[grade]) {
      acc[grade] = {
        count: 0,
        totalScore: 0,
        students: []
      };
    }
    acc[grade].count++;
    acc[grade].totalScore += student.assessment_score;
    acc[grade].students.push(student);
    return acc;
  }, {} as Record<string, { count: number; totalScore: number; students: Student[] }>);

  const gradeData = Object.entries(gradeCounts)
    .map(([grade, data]) => ({
      grade,
      count: data.count,
      avgScore: Math.round(data.totalScore / data.count),
      change: Math.round(Math.random() * 10 - 5) // Mock change data
    }))
    .sort((a, b) => a.grade.localeCompare(b.grade));

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-performance-excellent';
    if (score >= 70) return 'text-performance-good';
    if (score >= 60) return 'text-performance-average';
    return 'text-performance-poor';
  };

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-3 w-3 text-performance-excellent" />;
    if (change < 0) return <TrendingDown className="h-3 w-3 text-performance-poor" />;
    return null;
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Users className="h-5 w-5" />
          Students by Grade
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Enrollment and performance overview
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {gradeData.map((grade) => (
            <div key={grade.grade} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-education-blue/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-education-blue">
                    {grade.grade.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{grade.grade}</p>
                  <p className="text-sm text-muted-foreground">
                    {grade.count} students
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <span className={`text-lg font-semibold ${getScoreColor(grade.avgScore)}`}>
                    {grade.avgScore}%
                  </span>
                  {getTrendIcon(grade.change)}
                </div>
                {grade.change !== 0 && (
                  <p className="text-xs text-muted-foreground">
                    {grade.change > 0 ? '+' : ''}{grade.change}% vs last term
                  </p>
                )}
              </div>
            </div>
          ))}
          
          <div className="pt-3 border-t border-border">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Students</span>
              <Badge variant="secondary">{students.length}</Badge>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-muted-foreground">Overall Average</span>
              <span className="font-semibold text-education-blue">
                {Math.round(students.reduce((sum, s) => sum + s.assessment_score, 0) / students.length)}%
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};