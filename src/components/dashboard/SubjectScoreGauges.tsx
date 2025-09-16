import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Student } from '@/data/studentData';

interface SubjectScoreGaugesProps {
  students: Student[];
}

const GaugeChart = ({ score, subject, color }: { score: number; subject: string; color: string }) => {
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-32 h-32 animate-scale-in">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="hsl(var(--muted))"
          strokeWidth="6"
          fill="transparent"
          className="opacity-20"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke={color}
          strokeWidth="6"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{
            animation: `drawCircle 2s ease-out forwards`
          }}
        />
      </svg>
      {/* Score text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-foreground">{score}</span>
        <span className="text-xs text-muted-foreground">%</span>
      </div>
      {/* Subject label */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
        <span className="text-sm font-medium text-foreground whitespace-nowrap">{subject}</span>
      </div>
    </div>
  );
};

export const SubjectScoreGauges = ({ students }: SubjectScoreGaugesProps) => {
  // Calculate average scores for each subject
  const avgScores = students.reduce((acc, student) => {
    acc.english += student.subjects.english;
    acc.mathematics += student.subjects.mathematics;
    acc.science += student.subjects.science;
    acc.arts += student.subjects.arts;
    acc.physical_education += student.subjects.physical_education;
    return acc;
  }, {
    english: 0,
    mathematics: 0,
    science: 0,
    arts: 0,
    physical_education: 0
  });

  const studentCount = students.length;
  const subjects = [
    { 
      name: 'English', 
      score: Math.round(avgScores.english / studentCount), 
      color: 'hsl(var(--education-blue))' 
    },
    { 
      name: 'Mathematics', 
      score: Math.round(avgScores.mathematics / studentCount), 
      color: 'hsl(var(--education-purple))' 
    },
    { 
      name: 'Science', 
      score: Math.round(avgScores.science / studentCount), 
      color: 'hsl(var(--education-green))' 
    },
    { 
      name: 'Arts', 
      score: Math.round(avgScores.arts / studentCount), 
      color: 'hsl(var(--education-orange))' 
    },
    { 
      name: 'Phys. Ed', 
      score: Math.round(avgScores.physical_education / studentCount), 
      color: 'hsl(var(--education-teal))' 
    }
  ];

  return (
    <Card className="shadow-card hover:shadow-hover transition-all duration-500 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-education-purple to-education-teal bg-clip-text text-transparent">
          Average Subject Scores
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Performance across all subjects
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 pt-4">
          {subjects.map((subject, index) => (
            <div key={subject.name} style={{ animationDelay: `${index * 200}ms` }}>
              <GaugeChart 
                score={subject.score} 
                subject={subject.name} 
                color={subject.color}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};