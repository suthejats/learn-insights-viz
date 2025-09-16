import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Student } from "@/data/studentData";

interface GradeDistributionChartProps {
  students: Student[];
}

export const GradeDistributionChart = ({ students }: GradeDistributionChartProps) => {
  // Convert assessment scores to letter grades
  const getGrade = (score: number) => {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    return "F";
  };

  // Count students by grade
  const gradeCounts = students.reduce((acc, student) => {
    const grade = getGrade(student.assessment_score);
    acc[grade] = (acc[grade] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(gradeCounts).map(([grade, count]) => ({
    grade,
    count,
    percentage: Math.round((count / students.length) * 100)
  }));

  const COLORS = [
    'hsl(var(--performance-excellent))',
    'hsl(var(--performance-good))', 
    'hsl(var(--performance-average))',
    'hsl(var(--education-orange))',
    'hsl(var(--performance-poor))'
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-md">
          <p className="font-medium">Grade {data.grade}</p>
          <p className="text-education-blue">Students: {data.count}</p>
          <p className="text-xs text-muted-foreground">{data.percentage}% of total</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Grade Distribution</CardTitle>
        <p className="text-sm text-muted-foreground">
          Student performance by letter grades
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="count"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value) => `Grade ${value}`}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};