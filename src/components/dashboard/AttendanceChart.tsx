import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Student } from "@/data/studentData";

interface AttendanceChartProps {
  students: Student[];
}

export const AttendanceChart = ({ students }: AttendanceChartProps) => {
  // Generate mock attendance data based on engagement time
  const generateAttendanceData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    
    return months.map(month => {
      // Calculate attendance based on average engagement time
      const avgEngagement = students.reduce((sum, s) => sum + s.engagement_time, 0) / students.length;
      const baseAttendance = Math.min(95, Math.max(75, (avgEngagement / 180) * 100));
      
      // Add some variation per month
      const variation = Math.random() * 10 - 5;
      const attendance = Math.max(70, Math.min(100, baseAttendance + variation));
      
      return {
        month,
        attendance: Math.round(attendance),
        target: 85
      };
    });
  };

  const data = generateAttendanceData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-md">
          <p className="font-medium">{label}</p>
          <p className="text-education-blue">
            Attendance: {payload[0].value}%
          </p>
          <p className="text-education-teal">
            Target: {payload[1]?.value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Attendance Trend</CardTitle>
        <p className="text-sm text-muted-foreground">
          Monthly attendance vs target
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              domain={[70, 100]}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="attendance" 
              stroke="hsl(var(--education-blue))" 
              strokeWidth={3}
              dot={{ r: 4, fill: "hsl(var(--education-blue))" }}
            />
            <Line 
              type="monotone" 
              dataKey="target" 
              stroke="hsl(var(--education-teal))" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 3, fill: "hsl(var(--education-teal))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};