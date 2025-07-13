
import { DSAQuestion } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Zap, Code, Eye, ArrowRight } from 'lucide-react';

interface QuestionCardProps {
  question: DSAQuestion;
  onClick: () => void;
}

const QuestionCard = ({ question, onClick }: QuestionCardProps) => {
  const getDifficultyConfig = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return {
          className: 'bg-neon-green/20 text-neon-green border-neon-green/30',
          glow: 'hover:shadow-[0_0_20px_hsl(var(--neon-green)/0.3)]'
        };
      case 'medium':
        return {
          className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
          glow: 'hover:shadow-[0_0_20px_hsl(45_100%_60%/0.3)]'
        };
      case 'hard':
        return {
          className: 'bg-red-500/20 text-red-400 border-red-500/30',
          glow: 'hover:shadow-[0_0_20px_hsl(0_84%_60%/0.3)]'
        };
      default:
        return {
          className: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
          glow: ''
        };
    }
  };

  const difficultyConfig = getDifficultyConfig(question.difficulty);

  return (
    <Card 
      className="glass-card cursor-pointer transition-all duration-500 hover-lift hover:border-neon-blue/50 group relative overflow-hidden"
      onClick={onClick}
    >
      {/* Gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 via-neon-purple/20 to-neon-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
      
      <CardHeader className="pb-3 relative z-10">
        <div className="flex items-start justify-between mb-3">
          <CardTitle className="text-lg font-bold line-clamp-2 text-white group-hover:text-neon-blue transition-colors duration-300">
            {question.title}
          </CardTitle>
          <Badge className={`${difficultyConfig.className} border ${difficultyConfig.glow} transition-all duration-300`}>
            {question.difficulty}
          </Badge>
        </div>
        <Badge 
          variant="outline" 
          className="w-fit text-xs bg-neon-purple/10 text-neon-purple border-neon-purple/30 hover:bg-neon-purple/20 transition-colors"
        >
          {question.topic}
        </Badge>
      </CardHeader>
      
      <CardContent className="pt-0 relative z-10">
        <p className="text-muted-foreground text-sm line-clamp-2 mb-6 leading-relaxed">
          {question.description}
        </p>
        
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-neon-cyan" />
              <span>{question.timeComplexity}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-neon-purple" />
              <span>{question.spaceComplexity}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-neon-blue group-hover:text-neon-cyan transition-colors">
            <Eye className="w-3.5 h-3.5" />
            <span className="font-medium">Solve</span>
            <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </CardContent>
      
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-transparent to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
    </Card>
  );
};

export default QuestionCard;
