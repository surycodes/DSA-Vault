
export interface CompileRequest {
  language: string;
  code: string;
  input?: string;
}

export interface CompileResponse {
  output: string;
  error?: string;
  status: 'success' | 'error' | 'timeout';
  executionTime?: number;
}

// Mock compiler for demonstration - in production, you'd integrate with a real compiler API
export const compileCode = async (request: CompileRequest): Promise<CompileResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate compilation
      const { language, code } = request;
      
      if (code.trim().length === 0) {
        resolve({
          output: '',
          error: 'No code provided',
          status: 'error'
        });
        return;
      }

      // Mock successful compilation
      let output = '';
      
      if (language === 'python') {
        output = 'Python code executed successfully!\nOutput: Hello, World!\n';
      } else if (language === 'java') {
        output = 'Java code compiled and executed successfully!\nOutput: Hello, World!\n';
      } else if (language === 'cpp') {
        output = 'C++ code compiled and executed successfully!\nOutput: Hello, World!\n';
      }

      // Add some mock results based on common patterns
      if (code.includes('print') || code.includes('cout') || code.includes('System.out')) {
        output += 'Program completed successfully.';
      }

      resolve({
        output,
        status: 'success',
        executionTime: Math.random() * 1000 + 500 // Random execution time between 500-1500ms
      });
    }, 1500); // Simulate network delay
  });
};

export const getLanguageTemplate = (language: string): string => {
  switch (language) {
    case 'cpp':
      return `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    // Your code here
    cout << "Hello, World!" << endl;
    return 0;
}`;
    case 'java':
      return `public class Solution {
    public static void main(String[] args) {
        // Your code here
        System.out.println("Hello, World!");
    }
}`;
    case 'python':
      return `# Your code here
print("Hello, World!")`;
    default:
      return '';
  }
};
