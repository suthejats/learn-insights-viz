import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Student } from "@/data/studentData";

interface SubjectPerformanceChartProps {
  students: Student[];
}

export const SubjectPerformanceChart = ({ students }: SubjectPerformanceChartProps) => {
  // Generate subject performance data based on cognitive skills
  const generateSubjectData = () => {
    const subjects = ['Mathematics', 'Science', 'English', 'History', 'Art'];
    
    return subjects.map(subject => {
      let baseScore;
      // Correlate subjects with different cognitive skills
      switch(subject) {
        case 'Mathematics':
          baseScore = students.reduce((sum, s) => sum + s.focus, 0) / students.length;
          break;
        case 'Science':
          baseScore = students.reduce((sum, s) => sum + s.comprehension, 0) / students.length;
          break;
        case 'English':
          baseScore = students.reduce((sum, s) => sum + s.retention, 0) / students.length;
          break;
        case 'History':
          baseScore = students.reduce((sum, s) => sum + s.retention, 0) / students.length;
          break;
        case 'Art':
          baseScore = students.reduce((sum, s) => sum + s.attention, 0) / students.length;
          break;
        default:
          baseScore = students.reduce((sum, s) => sum + s.assessment_score, 0) / students.length;
      }
      
      // Add some variation
      const variation = Math.random() * 10 - 5;
      const score = Math.max(60, Math.min(95, baseScore + variation));
      
      return {
        subject,
        current: Math.round(score),
        previous: Math.round(score - 3 + Math.random() * 6),
        target: 85
      };
    });
  };

  const data = generateSubjectData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-md">
          <p className="font-medium">{label}</p>
          <p className="text-education-blue">Current: {payload[0].value}%</p>
          <p className="text-education-teal">Previous: {payload[1].value}%</p>
          <p className="text-muted-foreground text-xs">Target: {payload[2].value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Subject Performance Analysis</CardTitle>
        <p className="text-sm text-muted-foreground">
          Current vs previous period performance by subject
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="subject" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="current" 
              fill="hsl(var(--education-blue))"
              radius={[2, 2, 0, 0]}
              name="Current"
            />
            <Bar 
              dataKey="previous" 
              fill="hsl(var(--education-teal))"
              radius={[2, 2, 0, 0]}
              name="Previous"
              opacity={0.7}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};