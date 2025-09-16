import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Student } from '@/data/studentData';

interface SectionAnalyticsProps {
  students: Student[];
}

export const SectionAnalytics = ({ students }: SectionAnalyticsProps) => {
  // Calculate section-wise performance data
  const sectionData = students.reduce((acc, student) => {
    const sectionKey = `Section ${student.section}`;
    
    if (!acc[sectionKey]) {
      acc[sectionKey] = {
        section: sectionKey,
        totalStudents: 0,
        totalScore: 0,
        maleCount: 0,
        femaleCount: 0,
        avgAttendance: 0
      };
    }
    
    acc[sectionKey].totalStudents++;
    acc[sectionKey].totalScore += student.assessment_score;
    acc[sectionKey].avgAttendance += student.attendance_rate;
    
    if (student.gender === 'Male') {
      acc[sectionKey].maleCount++;
    } else {
      acc[sectionKey].femaleCount++;
    }
    
    return acc;
  }, {} as Record<string, any>);

  const chartData = Object.values(sectionData).map((section: any) => ({
    section: section.section,
    avgScore: Math.round(section.totalScore / section.totalStudents),
    maleStudents: section.maleCount,
    femaleStudents: section.femaleCount,
    attendance: Math.round((section.avgAttendance / section.totalStudents) * 10) / 10
  }));

  return (
    <Card className="shadow-card hover:shadow-hover transition-all duration-500 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-education-green to-education-orange bg-clip-text text-transparent">
          Section-wise Performance Analysis
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Comparative analysis across different sections
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="section" 
                tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow-card)'
                }}
              />
              <Legend />
              <Bar 
                dataKey="maleStudents" 
                name="Male Students"
                fill="hsl(var(--education-blue))"
                radius={[2, 2, 0, 0]}
                animationDuration={1000}
              />
              <Bar 
                dataKey="femaleStudents" 
                name="Female Students"
                fill="hsl(var(--education-purple))"
                radius={[2, 2, 0, 0]}
                animationDuration={1000}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};