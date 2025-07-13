
import { DSAQuestion, Language } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Zap, BookOpen, Code, Lightbulb, Target, Cpu } from 'lucide-react';
import CodeEditor from './CodeEditor';

interface QuestionDetailProps {
  question: DSAQuestion;
  onBack: () => void;
}

const QuestionDetail = ({ question, onBack }: QuestionDetailProps) => {
  const getDifficultyConfig = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-neon-green/20 text-neon-green border-neon-green/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'hard':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <Button
          variant="outline"
          onClick={onBack}
          className="glass border-white/20 hover:border-neon-blue/50 hover:bg-neon-blue/10 text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Vault
        </Button>
        
        <div className="glass-card p-8 rounded-2xl">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                {question.title}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <Badge className={`${getDifficultyConfig(question.difficulty)} border font-medium`}>
                  {question.difficulty}
                </Badge>
                <Badge 
                  variant="outline" 
                  className="bg-neon-purple/10 text-neon-purple border-neon-purple/30"
                >
                  {question.topic}
                </Badge>
                <div className="flex items-center gap-6 text-sm text-muted-foreground ml-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-neon-cyan" />
                    <span>{question.timeComplexity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-neon-purple" />
                    <span>{question.spaceComplexity}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-2xl gradient-primary">
              <Target className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <div className="p-2 rounded-lg gradient-secondary">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                Problem Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed text-base">
                {question.description}
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <div className="p-2 rounded-lg gradient-accent">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                Approach
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed text-base">
                {question.approach}
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <div className="p-2 rounded-lg bg-gradient-to-r from-neon-pink to-neon-purple">
                  <Code className="w-5 h-5 text-white" />
                </div>
                Solution Explanation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed text-base">
                {question.solution}
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <div className="p-2 rounded-lg bg-gradient-to-r from-green-400 to-blue-500">
                  <Cpu className="w-5 h-5 text-white" />
                </div>
                Reference Code
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="cpp" className="w-full">
                <TabsList className="grid w-full grid-cols-3 glass border-white/10">
                  <TabsTrigger value="cpp" className="data-[state=active]:gradient-primary data-[state=active]:text-white">C++</TabsTrigger>
                  <TabsTrigger value="java" className="data-[state=active]:gradient-primary data-[state=active]:text-white">Java</TabsTrigger>
                  <TabsTrigger value="python" className="data-[state=active]:gradient-primary data-[state=active]:text-white">Python</TabsTrigger>
                </TabsList>
                <TabsContent value="cpp" className="mt-4">
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono overflow-x-auto border border-gray-700">
                    <code>{question.code.cpp}</code>
                  </pre>
                </TabsContent>
                <TabsContent value="java" className="mt-4">
                  <pre className="bg-gray-900 text-orange-400 p-4 rounded-lg text-sm font-mono overflow-x-auto border border-gray-700">
                    <code>{question.code.java}</code>
                  </pre>
                </TabsContent>
                <TabsContent value="python" className="mt-4">
                  <pre className="bg-gray-900 text-yellow-400 p-4 rounded-lg text-sm font-mono overflow-x-auto border border-gray-700">
                    <code>{question.code.python}</code>
                  </pre>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="lg:sticky lg:top-6">
          <CodeEditor initialCode={question.code} />
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;
