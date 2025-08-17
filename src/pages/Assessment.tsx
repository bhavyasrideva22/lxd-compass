import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AssessmentProgress } from '@/components/AssessmentProgress';
import { QuestionCard } from '@/components/QuestionCard';
import { Button } from '@/components/ui/button';
import { assessmentQuestions } from '@/data/questions';
import { AssessmentResponse } from '@/types/assessment';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Assessment = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<number | undefined>();

  const currentQuestion = assessmentQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === assessmentQuestions.length - 1;
  const canProceed = currentAnswer !== undefined;

  useEffect(() => {
    // Load existing answer for current question
    const existingResponse = responses.find(r => r.questionId === currentQuestion.id);
    setCurrentAnswer(existingResponse?.value);
  }, [currentQuestionIndex, responses, currentQuestion.id]);

  const handleAnswer = (value: number) => {
    setCurrentAnswer(value);
    
    // Update responses
    const newResponse: AssessmentResponse = {
      questionId: currentQuestion.id,
      value,
      category: currentQuestion.category,
      subcategory: currentQuestion.subcategory
    };

    setResponses(prev => {
      const filtered = prev.filter(r => r.questionId !== currentQuestion.id);
      return [...filtered, newResponse];
    });
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Store responses and navigate to results
      localStorage.setItem('assessmentResponses', JSON.stringify(responses));
      navigate('/results');
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-assessment-bg to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <AssessmentProgress 
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={assessmentQuestions.length}
            category={currentQuestion.category}
          />

          <div className="mb-8">
            <QuestionCard 
              question={currentQuestion}
              onAnswer={handleAnswer}
              currentAnswer={currentAnswer}
            />
          </div>

          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {assessmentQuestions.length}
            </div>

            <Button
              variant={isLastQuestion ? "success" : "hero"}
              onClick={handleNext}
              disabled={!canProceed}
              className="flex items-center gap-2"
            >
              {isLastQuestion ? 'Get Results' : 'Next'}
              {!isLastQuestion && <ChevronRight className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;