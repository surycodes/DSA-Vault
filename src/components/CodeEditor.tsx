
import { useState } from 'react';
import { Language } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { compileCode, getLanguageTemplate, CompileResponse } from '@/utils/codeCompiler';
import { Play, Loader2, Copy, RotateCcw, Terminal, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CodeEditorProps {
  initialCode?: {
    cpp: string;
    java: string;
    python: string;
  };
}

const CodeEditor = ({ initialCode }: CodeEditorProps) => {
  const [language, setLanguage] = useState<Language>('cpp');
  const [code, setCode] = useState(initialCode?.[language] || getLanguageTemplate(language));
  const [output, setOutput] = useState<CompileResponse | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const { toast } = useToast();

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setCode(initialCode?.[newLanguage] || getLanguageTemplate(newLanguage));
    setOutput(null);
  };

  const handleRunCode = async () => {
    setIsCompiling(true);
    setOutput(null);
    
    try {
      const result = await compileCode({
        language,
        code
      });
      setOutput(result);
      
      if (result.status === 'success') {
        toast({
          title: "Code executed successfully!",
          description: `Execution time: ${result.executionTime?.toFixed(0)}ms`,
        });
      }
    } catch (error) {
      setOutput({
        output: '',
        error: 'Failed to compile code',
        status: 'error'
      });
    } finally {
      setIsCompiling(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code copied!",
      description: "Code has been copied to clipboard",
    });
  };

  const handleResetCode = () => {
    setCode(initialCode?.[language] || getLanguageTemplate(language));
    setOutput(null);
  };

  const getLanguageDisplayName = (lang: Language) => {
    switch (lang) {
      case 'cpp': return 'C++';
      case 'java': return 'Java';
      case 'python': return 'Python';
      default: return lang;
    }
  };

  const getLanguageIcon = (lang: Language) => {
    const colors = {
      cpp: 'text-blue-400',
      java: 'text-orange-400',
      python: 'text-yellow-400'
    };
    return colors[lang] || 'text-gray-400';
  };

  return (
    <div className="glass-card overflow-hidden rounded-2xl">
      {/* Header */}
      <div className="bg-black/20 px-6 py-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-neon-cyan" />
              <h3 className="font-bold text-white">Code Editor</h3>
            </div>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-32 glass border-white/20 hover:border-neon-blue/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass border-white/20">
                <SelectItem value="cpp" className="hover:bg-white/10">
                  <span className={getLanguageIcon('cpp')}>C++</span>
                </SelectItem>
                <SelectItem value="java" className="hover:bg-white/10">
                  <span className={getLanguageIcon('java')}>Java</span>
                </SelectItem>
                <SelectItem value="python" className="hover:bg-white/10">
                  <span className={getLanguageIcon('python')}>Python</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyCode}
              className="glass border-white/20 hover:border-neon-cyan/50 hover:bg-neon-cyan/10 text-white"
            >
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetCode}
              className="glass border-white/20 hover:border-neon-purple/50 hover:bg-neon-purple/10 text-white"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
            <Button
              onClick={handleRunCode}
              disabled={isCompiling}
              className={`gradient-primary hover:scale-105 transition-all duration-300 text-white font-medium ${
                isCompiling ? 'animate-pulse' : 'hover:neon-glow-blue'
              }`}
            >
              {isCompiling ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Compiling...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Run Code
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Code Editor */}
      <div className="p-6">
        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="code-editor min-h-[350px] resize-none text-sm leading-6 bg-gray-900/80 border-gray-700/50 focus:border-neon-blue/50"
          placeholder={`Write your ${getLanguageDisplayName(language)} code here...`}
        />
      </div>
      
      {/* Output Section */}
      {output && (
        <div className="border-t border-white/10 bg-black/20">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-neon-green" />
                <h4 className="font-bold text-white">Output</h4>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium border ${
                output.status === 'success' 
                  ? 'bg-neon-green/20 text-neon-green border-neon-green/30' 
                  : 'bg-red-500/20 text-red-400 border-red-500/30'
              }`}>
                {output.status === 'success' ? 'SUCCESS' : 'ERROR'}
              </div>
            </div>
            <pre className={`text-sm p-4 rounded-lg font-mono whitespace-pre-wrap ${
              output.status === 'success' 
                ? 'terminal-output' 
                : 'terminal-error'
            }`}>
              {output.error || output.output}
            </pre>
            {output.executionTime && (
              <div className="mt-3 text-xs text-muted-foreground flex items-center gap-2">
                <Zap className="w-3 h-3 text-neon-yellow" />
                Execution time: {output.executionTime.toFixed(0)}ms
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
