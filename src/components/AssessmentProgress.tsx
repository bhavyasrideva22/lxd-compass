import { Progress } from "@/components/ui/progress";

interface AssessmentProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  category: string;
}

export const AssessmentProgress = ({ currentQuestion, totalQuestions, category }: AssessmentProgressProps) => {
  const progress = (currentQuestion / totalQuestions) * 100;
  
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'psychometric': return 'bg-primary';
      case 'technical': return 'bg-accent';
      case 'wiscar': return 'bg-success';
      default: return 'bg-primary';
    }
  };

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-muted-foreground capitalize">
          {category} Assessment
        </span>
        <span className="text-sm font-medium text-muted-foreground">
          {currentQuestion} of {totalQuestions}
        </span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};