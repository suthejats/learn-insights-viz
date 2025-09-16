export interface Student {
  student_id: string;
  name: string;
  class: string;
  comprehension: number;
  attention: number;
  focus: number;
  retention: number;
  assessment_score: number;
  engagement_time: number;
  predicted_score?: number;
  learning_persona?: string;
}

export interface SkillCorrelation {
  skill: string;
  correlation: number;
  impact: 'High' | 'Medium' | 'Low';
}

export interface LearningPersona {
  name: string;
  description: string;
  characteristics: string[];
  count: number;
  avgScore: number;
  color: string;
}

// Generate synthetic student data
export const generateStudentData = (): Student[] => {
  const firstNames = ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Oliver', 'Sofia', 'Elijah', 'Charlotte', 'William', 'Amelia', 'James', 'Isabella', 'Benjamin', 'Mia', 'Lucas', 'Harper', 'Henry', 'Evelyn', 'Alexander', 'Abigail', 'Mason', 'Emily', 'Michael', 'Elizabeth', 'Ethan', 'Mila', 'Daniel', 'Ella', 'Jacob'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson'];
  const classes = ['10A', '10B', '10C', '11A', '11B', '11C', '12A', '12B', '12C'];
  
  const students: Student[] = [];
  
  for (let i = 0; i < 150; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    // Generate correlated cognitive skills (some students are naturally better across all areas)
    const baseAbility = 0.3 + Math.random() * 0.7; // 0.3 to 1.0
    const noise = () => (Math.random() - 0.5) * 0.3; // Add some variation
    
    const comprehension = Math.max(0, Math.min(100, (baseAbility + noise()) * 100));
    const attention = Math.max(0, Math.min(100, (baseAbility + noise()) * 100));
    const focus = Math.max(0, Math.min(100, (baseAbility + noise()) * 100));
    const retention = Math.max(0, Math.min(100, (baseAbility + noise()) * 100));
    
    // Calculate engagement time (correlated with skills but with more variation)
    const engagement_time = Math.max(10, Math.min(180, 30 + (baseAbility * 100) + (Math.random() - 0.5) * 60));
    
    // Calculate assessment score based on cognitive skills with some randomness
    const skillAverage = (comprehension + attention + focus + retention) / 4;
    const assessment_score = Math.max(0, Math.min(100, skillAverage + (Math.random() - 0.5) * 20));
    
    students.push({
      student_id: `STU${String(i + 1).padStart(3, '0')}`,
      name: `${firstName} ${lastName}`,
      class: classes[Math.floor(Math.random() * classes.length)],
      comprehension: Math.round(comprehension),
      attention: Math.round(attention),
      focus: Math.round(focus),
      retention: Math.round(retention),
      assessment_score: Math.round(assessment_score),
      engagement_time: Math.round(engagement_time)
    });
  }
  
  return students;
};

// Simulate ML model predictions
export const addMLPredictions = (students: Student[]): Student[] => {
  return students.map(student => {
    // Simple linear model simulation
    const predicted_score = Math.round(
      student.comprehension * 0.25 +
      student.attention * 0.2 +
      student.focus * 0.2 +
      student.retention * 0.25 +
      student.engagement_time * 0.1 +
      (Math.random() - 0.5) * 10 // Add some noise
    );
    
    return {
      ...student,
      predicted_score: Math.max(0, Math.min(100, predicted_score))
    };
  });
};

// Simulate student clustering into learning personas
export const assignLearningPersonas = (students: Student[]): Student[] => {
  return students.map(student => {
    const avgSkill = (student.comprehension + student.attention + student.focus + student.retention) / 4;
    const highEngagement = student.engagement_time > 90;
    
    let persona: string;
    
    if (avgSkill >= 80 && highEngagement) {
      persona = 'High Achiever';
    } else if (avgSkill >= 70 && student.focus >= 80) {
      persona = 'Focused Learner';
    } else if (student.engagement_time >= 100 && avgSkill >= 60) {
      persona = 'Engaged Student';
    } else if (avgSkill >= 80 && student.engagement_time < 60) {
      persona = 'Quick Learner';
    } else if (student.attention < 50 && student.focus < 50) {
      persona = 'Struggling Student';
    } else {
      persona = 'Average Performer';
    }
    
    return { ...student, learning_persona: persona };
  });
};

// Calculate skill correlations
export const calculateCorrelations = (students: Student[]): SkillCorrelation[] => {
  const skills = ['comprehension', 'attention', 'focus', 'retention', 'engagement_time'];
  const correlations: SkillCorrelation[] = [];
  
  skills.forEach(skill => {
    // Calculate correlation with assessment_score
    const skillValues = students.map(s => s[skill as keyof Student] as number);
    const scores = students.map(s => s.assessment_score);
    
    // Simple correlation calculation
    const correlation = calculatePearsonCorrelation(skillValues, scores);
    
    correlations.push({
      skill: skill.replace('_', ' ').toUpperCase(),
      correlation: Math.round(correlation * 100) / 100,
      impact: correlation > 0.6 ? 'High' : correlation > 0.3 ? 'Medium' : 'Low'
    });
  });
  
  return correlations.sort((a, b) => Math.abs(b.correlation) - Math.abs(a.correlation));
};

// Helper function to calculate Pearson correlation
function calculatePearsonCorrelation(x: number[], y: number[]): number {
  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
  const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);
  const sumYY = y.reduce((sum, yi) => sum + yi * yi, 0);
  
  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY));
  
  return denominator === 0 ? 0 : numerator / denominator;
}

// Get learning persona statistics
export const getLearningPersonaStats = (students: Student[]): LearningPersona[] => {
  const personaMap = new Map<string, { students: Student[], color: string, description: string, characteristics: string[] }>();
  
  // Define persona details
  const personaDetails = {
    'High Achiever': {
      color: '#10b981',
      description: 'Excellent across all cognitive skills with high engagement',
      characteristics: ['High comprehension', 'Strong focus', 'Excellent retention', 'High engagement']
    },
    'Focused Learner': {
      color: '#3b82f6',
      description: 'Strong focus and attention with good overall performance',
      characteristics: ['Excellent focus', 'Good attention span', 'Consistent performance']
    },
    'Engaged Student': {
      color: '#8b5cf6',
      description: 'High engagement with moderate to good cognitive skills',
      characteristics: ['High engagement time', 'Motivated learner', 'Active participation']
    },
    'Quick Learner': {
      color: '#06b6d4',
      description: 'High cognitive skills but lower engagement time',
      characteristics: ['Fast processing', 'Efficient learning', 'Quick understanding']
    },
    'Struggling Student': {
      color: '#ef4444',
      description: 'Needs additional support in attention and focus areas',
      characteristics: ['Low attention', 'Focus challenges', 'Needs support']
    },
    'Average Performer': {
      color: '#f59e0b',
      description: 'Moderate performance across all areas with potential for growth',
      characteristics: ['Balanced skills', 'Room for improvement', 'Steady progress']
    }
  };
  
  students.forEach(student => {
    const persona = student.learning_persona!;
    if (!personaMap.has(persona)) {
      personaMap.set(persona, { 
        students: [], 
        ...personaDetails[persona as keyof typeof personaDetails]
      });
    }
    personaMap.get(persona)!.students.push(student);
  });
  
  return Array.from(personaMap.entries()).map(([name, data]) => ({
    name,
    description: data.description,
    characteristics: data.characteristics,
    count: data.students.length,
    avgScore: Math.round(data.students.reduce((sum, s) => sum + s.assessment_score, 0) / data.students.length),
    color: data.color
  })).sort((a, b) => b.count - a.count);
};