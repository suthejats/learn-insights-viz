import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Student } from "@/data/studentData";

interface SkillPerformanceChartProps {
  students: Student[];
}

export const SkillPerformanceChart = ({ students }: SkillPerformanceChartProps) => {
  const data = [
    {
      skill: "Comprehension",
      average: Math.round(students.reduce((sum, s) => sum + s.comprehension, 0) / students.length),
      correlation: 0.78
    },
    {
      skill: "Attention",
      average: Math.round(students.reduce((sum, s) => sum + s.attention, 0) / students.length),
      correlation: 0.65
    },
    {
      skill: "Focus", 
      average: Math.round(students.reduce((sum, s) => sum + s.focus, 0) / students.length),
      correlation: 0.72
    },
    {
      skill: "Retention",
      average: Math.round(students.reduce((sum, s) => sum + s.retention, 0) / students.length),
      correlation: 0.81
    }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-md">
          <p className="font-medium">{label}</p>
          <p className="text-education-blue">
            Average: {payload[0].value}%
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Correlation with performance: {(payload[0].payload.correlation * 100).toFixed(0)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Cognitive Skills vs Performance</CardTitle>
        <p className="text-sm text-muted-foreground">
          Average skill levels across all students
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="skill" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="average" 
              fill="hsl(var(--education-blue))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};