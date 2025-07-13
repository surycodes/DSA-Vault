
import { useState, useEffect, useMemo } from 'react';
import { DSAQuestion, FilterOptions } from '@/types';
import { dsaQuestions, topics } from '@/data/questions';
import { loadQuestionsFromStorage, addQuestionToStorage } from '@/utils/localStorage';
import QuestionCard from '@/components/QuestionCard';
import QuestionFilters from '@/components/QuestionFilters';
import QuestionDetail from '@/components/QuestionDetail';
import AddQuestionDialog from '@/components/AddQuestionDialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code2, BookOpen, Users, TrendingUp, Zap, Shield, Cpu } from 'lucide-react';

const Index = () => {
  const [allQuestions, setAllQuestions] = useState<DSAQuestion[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<DSAQuestion | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    difficulty: '',
    topic: '',
    search: ''
  });

  useEffect(() => {
    // Load questions from localStorage and merge with default questions
    const savedQuestions = loadQuestionsFromStorage();
    const mergedQuestions = [...dsaQuestions, ...savedQuestions];
    setAllQuestions(mergedQuestions);
  }, []);

  const filteredQuestions = useMemo(() => {
    return allQuestions.filter((question) => {
      const matchesSearch = !filters.search || 
        question.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        question.description.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesDifficulty = !filters.difficulty || question.difficulty === filters.difficulty;
      const matchesTopic = !filters.topic || question.topic === filters.topic;
      
      return matchesSearch && matchesDifficulty && matchesTopic;
    });
  }, [allQuestions, filters]);

  const handleAddQuestion = (newQuestion: DSAQuestion) => {
    addQuestionToStorage(newQuestion);
    setAllQuestions(prev => [...prev, newQuestion]);
  };

  const stats = useMemo(() => {
    const total = allQuestions.length;
    const easy = allQuestions.filter(q => q.difficulty === 'Easy').length;
    const medium = allQuestions.filter(q => q.difficulty === 'Medium').length;
    const hard = allQuestions.filter(q => q.difficulty === 'Hard').length;
    const uniqueTopics = new Set(allQuestions.map(q => q.topic)).size;
    
    return { total, easy, medium, hard, uniqueTopics };
  }, [allQuestions]);

  if (selectedQuestion) {
    return (
      <div className="min-h-screen py-8 px-4">
        <QuestionDetail 
          question={selectedQuestion} 
          onBack={() => setSelectedQuestion(null)} 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Header with Neon Gradients */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-400/20 animate-gradient"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-background to-background"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-3 rounded-2xl glass-card neon-glow-blue">
                <Code2 className="w-12 h-12 text-neon-blue" />
              </div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-neon-blue via-neon-purple to-neon-cyan bg-clip-text text-transparent">
                DSA Vault
              </h1>
            </div>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Master Data Structures and Algorithms with our comprehensive collection of problems, 
              built-in compiler, and detailed solutions in a futuristic coding environment.
            </p>
            
            {/* Stats Cards with Glassmorphism */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="glass-card p-6 rounded-2xl hover-lift group">
                <div className="text-3xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors">
                  {stats.total}
                </div>
                <div className="text-sm text-muted-foreground">Total Problems</div>
              </div>
              <div className="glass-card p-6 rounded-2xl hover-lift group">
                <div className="text-3xl font-bold text-neon-green mb-2 group-hover:scale-110 transition-transform">
                  {stats.easy}
                </div>
                <div className="text-sm text-muted-foreground">Easy</div>
              </div>
              <div className="glass-card p-6 rounded-2xl hover-lift group">
                <div className="text-3xl font-bold text-yellow-400 mb-2 group-hover:scale-110 transition-transform">
                  {stats.medium}
                </div>
                <div className="text-sm text-muted-foreground">Medium</div>
              </div>
              <div className="glass-card p-6 rounded-2xl hover-lift group">
                <div className="text-3xl font-bold text-red-400 mb-2 group-hover:scale-110 transition-transform">
                  {stats.hard}
                </div>
                <div className="text-sm text-muted-foreground">Hard</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Practice Problems</h2>
            <p className="text-muted-foreground">
              {filteredQuestions.length} of {allQuestions.length} problems
            </p>
          </div>
          <AddQuestionDialog topics={topics} onAddQuestion={handleAddQuestion} />
        </div>

        {/* Filters */}
        <div className="mb-8">
          <QuestionFilters
            filters={filters}
            topics={topics}
            onFiltersChange={setFilters}
          />
        </div>

        {/* Questions Grid */}
        {filteredQuestions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredQuestions.map((question, index) => (
              <div 
                key={question.id} 
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <QuestionCard
                  question={question}
                  onClick={() => setSelectedQuestion(question)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="glass-card p-12 rounded-3xl max-w-md mx-auto">
              <BookOpen className="w-16 h-16 text-neon-purple mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">No questions found</h3>
              <p className="text-muted-foreground mb-8">Try adjusting your filters or add a new question</p>
              <AddQuestionDialog topics={topics} onAddQuestion={handleAddQuestion} />
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8 rounded-2xl hover-lift group text-center">
            <div className="p-4 rounded-2xl gradient-primary w-fit mx-auto mb-6 group-hover:animate-glow-pulse">
              <Cpu className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Built-in Compiler</h3>
            <p className="text-muted-foreground leading-relaxed">
              Test your solutions with our integrated compiler supporting C++, Java, and Python with real-time execution.
            </p>
          </div>
          
          <div className="glass-card p-8 rounded-2xl hover-lift group text-center">
            <div className="p-4 rounded-2xl gradient-secondary w-fit mx-auto mb-6 group-hover:animate-glow-pulse">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Detailed Solutions</h3>
            <p className="text-muted-foreground leading-relaxed">
              Learn from comprehensive explanations, multiple approaches, and complexity analysis.
            </p>
          </div>
          
          <div className="glass-card p-8 rounded-2xl hover-lift group text-center">
            <div className="p-4 rounded-2xl gradient-accent w-fit mx-auto mb-6 group-hover:animate-glow-pulse">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Track Progress</h3>
            <p className="text-muted-foreground leading-relaxed">
              Monitor your improvement across different topics and difficulty levels with analytics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
