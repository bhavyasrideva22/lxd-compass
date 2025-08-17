import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Brain, Users, Lightbulb, Target, ArrowRight, CheckCircle } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Psychometric Analysis",
      description: "Assess personality traits, learning styles, and cognitive preferences that align with LXD success."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Technical Readiness",
      description: "Evaluate your knowledge of instructional design principles, tools, and methodologies."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "WISCAR Framework",
      description: "Comprehensive evaluation using Will, Interest, Skill, Cognitive readiness, Ability to learn, and Real-world alignment."
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Personalized Recommendations",
      description: "Get tailored career guidance and learning paths based on your unique profile."
    }
  ];

  const benefits = [
    "Discover if Learning Experience Design is right for you",
    "Identify your strengths and areas for development",
    "Get personalized career guidance and next steps",
    "Understand the skills needed for LXD success",
    "Receive alternative career suggestions if needed"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-assessment-bg to-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2">
              Career Assessment Tool
            </Badge>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Should I Learn Learning Experience Design?
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover your potential as a Learning Experience Designer through a comprehensive assessment 
              that evaluates your psychological fit, technical readiness, and career alignment.
            </p>
            <Button 
              variant="hero" 
              size="lg" 
              onClick={() => navigate('/assessment')}
              className="text-lg px-8 py-6 h-auto"
            >
              Start Assessment
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              ⏱️ Takes approximately 10-15 minutes
            </p>
          </div>

          {/* What You'll Learn */}
          <Card className="mb-16 shadow-[var(--shadow-card)] border-0">
            <CardHeader>
              <CardTitle className="text-2xl text-center">What You'll Discover</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-6">
                  <h3 className="font-semibold mb-3">About Learning Experience Design</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Learning Experience Designers blend instructional design, user experience, 
                    multimedia production, and educational theory to create engaging, effective 
                    learning journeys. They work in corporate training, higher education, 
                    EdTech companies, and consulting firms.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assessment Components */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Comprehensive Assessment Framework</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="shadow-[var(--shadow-card)] border-0 hover:shadow-[var(--shadow-elegant)] transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4 text-primary">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 shadow-[var(--shadow-card)] border-0">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Discover Your LXD Potential?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Take the first step towards understanding if Learning Experience Design 
                is the right career path for you.
              </p>
              <Button 
                variant="hero" 
                size="lg" 
                onClick={() => navigate('/assessment')}
                className="text-lg px-8 py-6 h-auto"
              >
                Begin Your Assessment Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
