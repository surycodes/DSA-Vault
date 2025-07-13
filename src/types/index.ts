
export interface DSAQuestion {
  id: string;
  title: string;
  topic: string;
  description: string;
  approach: string;
  code: {
    cpp: string;
    java: string;
    python: string;
  };
  solution: string;
  timeComplexity: string;
  spaceComplexity: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  createdAt: string;
}

export interface FilterOptions {
  difficulty: string;
  topic: string;
  search: string;
}

export type Language = 'cpp' | 'java' | 'python';
