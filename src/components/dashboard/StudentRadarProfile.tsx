import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from "recharts";
import { Student } from "@/data/studentData";
import { useState } from "react";

interface StudentRadarProfileProps {
  students: Student[];
}

export const StudentRadarProfile = ({ students }: StudentRadarProfileProps) => {
  const [selectedStudent, setSelectedStudent] = useState<Student>(students[0]);
  
  const radarData = [
    {
      skill: "Comprehension",
      value: selectedStudent.comprehension,
      fullMark: 100
    },
    {
      skill: "Attention", 
      value: selectedStudent.attention,
      fullMark: 100
    },
    {
      skill: "Focus",
      value: selectedStudent.focus,
      fullMark: 100
    },
    {
      skill: "Retention",
      value: selectedStudent.retention,
      fullMark: 100
    },
    {
      skill: "Engagement",
      value: Math.round((selectedStudent.engagement_time / 180) * 100), // Normalize to 100
      fullMark: 100
    }
  ];

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Student Profile Analysis</CardTitle>
        <div className="flex items-center space-x-2">
          <Select 
            value={selectedStudent.student_id} 
            onValueChange={(value) => {
              const student = students.find(s => s.student_id === value);
              if (student) setSelectedStudent(student);
            }}
          >
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select a student" />
            </SelectTrigger>
            <SelectContent>
              {students.slice(0, 20).map((student) => (
                <SelectItem key={student.student_id} value={student.student_id}>
                  {student.name} - {student.class}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-3 bg-muted/30 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Assessment Score:</span>
              <span className="ml-2 font-semibold text-education-blue">
                {selectedStudent.assessment_score}%
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Learning Persona:</span>
              <span className="ml-2 font-semibold text-education-teal">
                {selectedStudent.learning_persona}
              </span>
            </div>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis 
              dataKey="skill" 
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]}
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            />
            <Radar
              name="Skills"
              dataKey="value"
              stroke="hsl(var(--education-blue))"
              fill="hsl(var(--education-blue))"
              fillOpacity={0.3}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};