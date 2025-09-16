import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Student } from '@/data/studentData';

interface GenderSectionChartProps {
  students: Student[];
}

export const GenderSectionChart = ({ students }: GenderSectionChartProps) => {
  // Calculate gender distribution by grade
  const genderData = students.reduce((acc, student) => {
    const grade = student.class.charAt(0) + student.class.charAt(1);
    const key = `${grade}-${student.gender}`;
    
    if (!acc[key]) {
      acc[key] = { grade, gender: student.gender, count: 0 };
    }
    acc[key].count++;
    return acc;
  }, {} as Record<string, { grade: string; gender: string; count: number }>);

  const pieData = Object.values(genderData).map(item => ({
    name: `Grade ${item.grade} ${item.gender}`,
    value: item.count,
    grade: item.grade,
    gender: item.gender
  }));

  const COLORS = {
    'Male': '#3B82F6',
    'Female': '#EC4899'
  };

  const getColor = (gender: string) => COLORS[gender as keyof typeof COLORS];

  return (
    <Card className="shadow-card hover:shadow-hover transition-all duration-500 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-education-blue to-education-purple bg-clip-text text-transparent">
          Students by Grade and Gender
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Distribution across different grades
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
                animationBegin={0}
                animationDuration={1000}
              >
                {pieData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={getColor(entry.gender)}
                    className="hover:opacity-80 transition-opacity duration-200"
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow-card)'
                }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};