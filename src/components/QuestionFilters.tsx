
import { FilterOptions } from '@/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Sparkles } from 'lucide-react';

interface QuestionFiltersProps {
  filters: FilterOptions;
  topics: string[];
  onFiltersChange: (filters: FilterOptions) => void;
}

const QuestionFilters = ({ filters, topics, onFiltersChange }: QuestionFiltersProps) => {
  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value });
  };

  const handleDifficultyChange = (value: string) => {
    const difficulty = value === 'all-difficulties' ? '' : value;
    onFiltersChange({ ...filters, difficulty });
  };

  const handleTopicChange = (value: string) => {
    const topic = value === 'all-topics' ? '' : value;
    onFiltersChange({ ...filters, topic });
  };

  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg gradient-accent">
          <Filter className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white">Smart Filters</h3>
        <Sparkles className="w-4 h-4 text-neon-cyan animate-pulse" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neon-cyan w-4 h-4" />
          <Input
            placeholder="Search questions..."
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 glass border-white/20 hover:border-neon-cyan/50 focus:border-neon-cyan text-white placeholder:text-gray-400"
          />
        </div>
        
        <Select value={filters.difficulty || 'all-difficulties'} onValueChange={handleDifficultyChange}>
          <SelectTrigger className="glass border-white/20 hover:border-neon-purple/50 text-white">
            <SelectValue placeholder="Select difficulty" />
          </SelectTrigger>
          <SelectContent className="glass border-white/20">
            <SelectItem value="all-difficulties" className="hover:bg-white/10">All Difficulties</SelectItem>
            <SelectItem value="Easy" className="hover:bg-white/10 text-neon-green">Easy</SelectItem>
            <SelectItem value="Medium" className="hover:bg-white/10 text-yellow-400">Medium</SelectItem>
            <SelectItem value="Hard" className="hover:bg-white/10 text-red-400">Hard</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={filters.topic || 'all-topics'} onValueChange={handleTopicChange}>
          <SelectTrigger className="glass border-white/20 hover:border-neon-blue/50 text-white">
            <SelectValue placeholder="Select topic" />
          </SelectTrigger>
          <SelectContent className="glass border-white/20 max-h-60">
            <SelectItem value="all-topics" className="hover:bg-white/10">All Topics</SelectItem>
            {topics.map((topic) => (
              <SelectItem key={topic} value={topic} className="hover:bg-white/10">
                {topic}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default QuestionFilters;
