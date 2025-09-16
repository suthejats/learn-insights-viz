import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Student } from "@/data/studentData";

interface AttentionPerformanceScatterProps {
  students: Student[];
}

export const AttentionPerformanceScatter = ({ students }: AttentionPerformanceScatterProps) => {
  const data = students.map(student => ({
    attention: student.attention,
    performance: student.assessment_score,
    name: student.name,
    engagement: student.engagement_time
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-md">
          <p className="font-medium">{data.name}</p>
          <p className="text-education-blue">Attention: {data.attention}%</p>
          <p className="text-education-teal">Performance: {data.performance}%</p>
          <p className="text-xs text-muted-foreground">Engagement: {data.engagement}min</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Attention vs Performance</CardTitle>
        <p className="text-sm text-muted-foreground">
          Correlation between attention levels and assessment scores
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              type="number" 
              dataKey="attention" 
              name="attention"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              domain={[0, 100]}
            />
            <YAxis 
              type="number" 
              dataKey="performance" 
              name="performance"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter 
              name="Students" 
              data={data} 
              fill="hsl(var(--education-teal))"
              fillOpacity={0.7}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};