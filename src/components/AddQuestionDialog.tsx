
import { useState } from 'react';
import { DSAQuestion } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AddQuestionDialogProps {
  topics: string[];
  onAddQuestion: (question: DSAQuestion) => void;
}

const AddQuestionDialog = ({ topics, onAddQuestion }: AddQuestionDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    topic: '',
    description: '',
    approach: '',
    solution: '',
    timeComplexity: '',
    spaceComplexity: '',
    difficulty: '' as 'Easy' | 'Medium' | 'Hard' | '',
    code: {
      cpp: '',
      java: '',
      python: ''
    }
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.topic || !formData.description || !formData.difficulty) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newQuestion: DSAQuestion = {
      id: Date.now().toString(),
      ...formData,
      difficulty: formData.difficulty as 'Easy' | 'Medium' | 'Hard',
      createdAt: new Date().toISOString().split('T')[0]
    };

    onAddQuestion(newQuestion);
    setFormData({
      title: '',
      topic: '',
      description: '',
      approach: '',
      solution: '',
      timeComplexity: '',
      spaceComplexity: '',
      difficulty: '',
      code: {
        cpp: '',
        java: '',
        python: ''
      }
    });
    setOpen(false);
    
    toast({
      title: "Question added successfully!",
      description: "Your new question has been added to the collection",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Question
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New DSA Question</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Question title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="topic">Topic *</Label>
              <Select value={formData.topic} onValueChange={(value) => setFormData({ ...formData, topic: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select topic" />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((topic) => (
                    <SelectItem key={topic} value={topic}>
                      {topic}
                    </SelectItem>
                  ))}
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty *</Label>
              <Select value={formData.difficulty} onValueChange={(value) => setFormData({ ...formData, difficulty: value as 'Easy' | 'Medium' | 'Hard' })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timeComplexity">Time Complexity</Label>
              <Input
                id="timeComplexity"
                value={formData.timeComplexity}
                onChange={(e) => setFormData({ ...formData, timeComplexity: e.target.value })}
                placeholder="e.g., O(n)"
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="spaceComplexity">Space Complexity</Label>
              <Input
                id="spaceComplexity"
                value={formData.spaceComplexity}
                onChange={(e) => setFormData({ ...formData, spaceComplexity: e.target.value })}
                placeholder="e.g., O(1)"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the problem statement"
              rows={3}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="approach">Approach</Label>
            <Textarea
              id="approach"
              value={formData.approach}
              onChange={(e) => setFormData({ ...formData, approach: e.target.value })}
              placeholder="Explain the approach to solve this problem"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="solution">Solution Explanation</Label>
            <Textarea
              id="solution"
              value={formData.solution}
              onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
              placeholder="Detailed explanation of the solution"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Code Implementation</Label>
            <Tabs defaultValue="cpp" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="cpp">C++</TabsTrigger>
                <TabsTrigger value="java">Java</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
              </TabsList>
              <TabsContent value="cpp" className="mt-4">
                <Textarea
                  value={formData.code.cpp}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    code: { ...formData.code, cpp: e.target.value }
                  })}
                  placeholder="C++ implementation"
                  rows={8}
                  className="font-mono"
                />
              </TabsContent>
              <TabsContent value="java" className="mt-4">
                <Textarea
                  value={formData.code.java}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    code: { ...formData.code, java: e.target.value }
                  })}
                  placeholder="Java implementation"
                  rows={8}
                  className="font-mono"
                />
              </TabsContent>
              <TabsContent value="python" className="mt-4">
                <Textarea
                  value={formData.code.python}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    code: { ...formData.code, python: e.target.value }
                  })}
                  placeholder="Python implementation"
                  rows={8}
                  className="font-mono"
                />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Add Question
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuestionDialog;
