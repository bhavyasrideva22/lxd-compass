import { Question } from '@/types/assessment';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';

interface QuestionCardProps {
  question: Question;
  onAnswer: (value: number) => void;
  currentAnswer?: number;
}

export const QuestionCard = ({ question, onAnswer, currentAnswer }: QuestionCardProps) => {
  const [selectedValue, setSelectedValue] = useState<number | undefined>(currentAnswer);

  const handleAnswer = (value: number) => {
    setSelectedValue(value);
    onAnswer(value);
  };

  const renderLikertScale = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-2">
        {question.scale?.labels.map((label, index) => {
          const value = index + 1;
          const isSelected = selectedValue === value;
          return (
            <Button
              key={value}
              variant={isSelected ? "hero" : "outline"}
              size="sm"
              onClick={() => handleAnswer(value)}
              className="h-auto p-3 text-xs flex flex-col items-center gap-2"
            >
              <span className="font-semibold">{value}</span>
              <span className="text-center leading-tight">{label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );

  const renderMultipleChoice = () => (
    <div className="space-y-3">
      {question.options?.map((option, index) => {
        const value = index + 1;
        const isSelected = selectedValue === value;
        return (
          <Button
            key={value}
            variant={isSelected ? "accent" : "outline"}
            onClick={() => handleAnswer(value)}
            className="w-full h-auto p-4 text-left justify-start"
          >
            <span className="flex items-center gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs font-semibold">
                {String.fromCharCode(64 + value)}
              </span>
              <span>{option}</span>
            </span>
          </Button>
        );
      })}
    </div>
  );

  return (
    <Card className="shadow-[var(--shadow-card)] border-0">
      <CardContent className="p-8">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold leading-relaxed text-foreground">
            {question.text}
          </h2>
          
          {question.type === 'likert' && renderLikertScale()}
          {(question.type === 'multiple-choice' || question.type === 'scenario') && renderMultipleChoice()}
        </div>
      </CardContent>
    </Card>
  );
};