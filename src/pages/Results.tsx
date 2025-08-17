import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AssessmentResponse, AssessmentResult } from '@/types/assessment';
import { calculateScores, generateRecommendation } from '@/utils/assessmentLogic';
import { CheckCircle, XCircle, AlertCircle, Download, Home, RotateCcw } from 'lucide-react';

const Results = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const responsesData = localStorage.getItem('assessmentResponses');
    if (!responsesData) {
      navigate('/');
      return;
    }

    try {
      const responses: AssessmentResponse[] = JSON.parse(responsesData);
      const scores = calculateScores(responses);
      const assessmentResult = generateRecommendation(scores);
      setResult(assessmentResult);
    } catch (error) {
      console.error('Error processing results:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'Yes': return <CheckCircle className="w-8 h-8 text-success" />;
      case 'Maybe': return <AlertCircle className="w-8 h-8 text-warning" />;
      case 'No': return <XCircle className="w-8 h-8 text-destructive" />;
      default: return null;
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'Yes': return 'bg-success text-success-foreground';
      case 'Maybe': return 'bg-warning text-warning-foreground';
      case 'No': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleRetakeAssessment = () => {
    localStorage.removeItem('assessmentResponses');
    navigate('/assessment');
  };

  const handleDownloadResults = () => {
    if (!result) return;
    
    const dataStr = JSON.stringify(result, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'lxd-assessment-results.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-assessment-bg to-background flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Calculating your results...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-assessment-bg to-background flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-8 text-center">
            <XCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">Unable to generate results</p>
            <Button onClick={() => navigate('/')}>Return Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-assessment-bg to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Your Assessment Results</h1>
            <p className="text-xl text-muted-foreground">Learning Experience Design Career Fit Analysis</p>
          </div>

          {/* Main Recommendation */}
          <Card className="shadow-[var(--shadow-card)] border-0">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  {getRecommendationIcon(result.recommendation)}
                </div>
                <div>
                  <Badge className={`${getRecommendationColor(result.recommendation)} text-lg px-6 py-2`}>
                    {result.recommendation === 'Yes' ? 'Highly Recommended' : 
                     result.recommendation === 'Maybe' ? 'Conditional Fit' : 'Not Recommended'}
                  </Badge>
                </div>
                <div className="max-w-2xl mx-auto">
                  <h2 className="text-2xl font-semibold mb-4">
                    {result.recommendation === 'Yes' ? 'You show excellent potential for Learning Experience Design!' :
                     result.recommendation === 'Maybe' ? 'You have good foundation but need development in key areas.' :
                     'Consider exploring related career paths that better match your strengths.'}
                  </h2>
                  <div className="text-lg">
                    <span className="text-muted-foreground">Overall Confidence Score: </span>
                    <span className="font-bold text-primary">{result.scores.overall_confidence}%</span>
                  </div>
                  <Progress value={result.scores.overall_confidence} className="mt-4 h-3" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Scores */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="shadow-[var(--shadow-card)] border-0">
              <CardHeader>
                <CardTitle className="text-primary">Psychometric Fit</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Interest</span>
                    <span className="font-semibold">{result.scores.psychometric.interest}%</span>
                  </div>
                  <Progress value={result.scores.psychometric.interest} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Personality Alignment</span>
                    <span className="font-semibold">{result.scores.psychometric.personality_fit}%</span>
                  </div>
                  <Progress value={result.scores.psychometric.personality_fit} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Motivation</span>
                    <span className="font-semibold">{result.scores.psychometric.motivation}%</span>
                  </div>
                  <Progress value={result.scores.psychometric.motivation} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-[var(--shadow-card)] border-0">
              <CardHeader>
                <CardTitle className="text-accent">Technical Readiness</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Aptitude</span>
                    <span className="font-semibold">{result.scores.technical.aptitude}%</span>
                  </div>
                  <Progress value={result.scores.technical.aptitude} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Prerequisites</span>
                    <span className="font-semibold">{result.scores.technical.prerequisite}%</span>
                  </div>
                  <Progress value={result.scores.technical.prerequisite} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Domain Knowledge</span>
                    <span className="font-semibold">{result.scores.technical.domain_knowledge}%</span>
                  </div>
                  <Progress value={result.scores.technical.domain_knowledge} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-[var(--shadow-card)] border-0">
              <CardHeader>
                <CardTitle className="text-success">WISCAR Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Will & Persistence</span>
                    <span className="font-semibold">{result.scores.wiscar.will}%</span>
                  </div>
                  <Progress value={result.scores.wiscar.will} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Skills & Experience</span>
                    <span className="font-semibold">{result.scores.wiscar.skill}%</span>
                  </div>
                  <Progress value={result.scores.wiscar.skill} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Learning Ability</span>
                    <span className="font-semibold">{result.scores.wiscar.ability_to_learn}%</span>
                  </div>
                  <Progress value={result.scores.wiscar.ability_to_learn} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Next Steps & Career Paths */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-[var(--shadow-card)] border-0">
              <CardHeader>
                <CardTitle>Recommended Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {result.next_steps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-[var(--shadow-card)] border-0">
              <CardHeader>
                <CardTitle>Suggested Career Paths</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.career_paths.map((path, index) => (
                    <Badge key={index} variant="outline" className="block w-full text-left p-3 h-auto">
                      {path}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="hero" onClick={handleDownloadResults} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Results
            </Button>
            <Button variant="outline" onClick={handleRetakeAssessment} className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4" />
              Retake Assessment
            </Button>
            <Button variant="secondary" onClick={() => navigate('/')} className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Return Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;