import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Student } from "@/data/studentData";
import { useState, useMemo } from "react";
import { Search, ChevronUp, ChevronDown } from "lucide-react";

interface StudentsTableProps {
  students: Student[];
}

type SortField = keyof Student;
type SortDirection = 'asc' | 'desc';

export const StudentsTable = ({ students }: StudentsTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("assessment_score");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredAndSortedStudents = useMemo(() => {
    let filtered = students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.learning_persona?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });
  }, [students, searchTerm, sortField, sortDirection]);

  const getPersonaColor = (persona: string) => {
    const colors: Record<string, string> = {
      'High Achiever': 'bg-performance-excellent text-white',
      'Focused Learner': 'bg-education-blue text-white',
      'Engaged Student': 'bg-education-purple text-white',
      'Quick Learner': 'bg-education-teal text-white',
      'Struggling Student': 'bg-performance-poor text-white',
      'Average Performer': 'bg-performance-average text-white'
    };
    return colors[persona] || 'bg-muted text-muted-foreground';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-performance-excellent';
    if (score >= 70) return 'text-performance-good';
    if (score >= 60) return 'text-performance-average';
    return 'text-performance-poor';
  };

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => handleSort(field)}
      className="h-auto p-1 font-medium justify-start"
    >
      {children}
      {sortField === field && (
        sortDirection === 'asc' ? <ChevronUp className="ml-1 h-3 w-3" /> : <ChevronDown className="ml-1 h-3 w-3" />
      )}
    </Button>
  );

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Student Performance Table</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students, classes, or personas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Badge variant="secondary">
            {filteredAndSortedStudents.length} of {students.length} students
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-2">
                  <SortButton field="name">Name</SortButton>
                </th>
                <th className="text-left p-2">
                  <SortButton field="class">Class</SortButton>
                </th>
                <th className="text-left p-2">
                  <SortButton field="assessment_score">Score</SortButton>
                </th>
                <th className="text-left p-2">
                  <SortButton field="comprehension">Comp.</SortButton>
                </th>
                <th className="text-left p-2">
                  <SortButton field="attention">Att.</SortButton>
                </th>
                <th className="text-left p-2">
                  <SortButton field="focus">Focus</SortButton>
                </th>
                <th className="text-left p-2">
                  <SortButton field="retention">Ret.</SortButton>
                </th>
                <th className="text-left p-2">
                  <SortButton field="engagement_time">Eng.</SortButton>
                </th>
                <th className="text-left p-2">Learning Persona</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedStudents.map((student) => (
                <tr key={student.student_id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="p-2 font-medium">{student.name}</td>
                  <td className="p-2 text-muted-foreground">{student.class}</td>
                  <td className={`p-2 font-semibold ${getScoreColor(student.assessment_score)}`}>
                    {student.assessment_score}%
                  </td>
                  <td className="p-2">{student.comprehension}%</td>
                  <td className="p-2">{student.attention}%</td>
                  <td className="p-2">{student.focus}%</td>
                  <td className="p-2">{student.retention}%</td>
                  <td className="p-2">{student.engagement_time}min</td>
                  <td className="p-2">
                    <Badge className={getPersonaColor(student.learning_persona || 'Unknown')}>
                      {student.learning_persona}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};