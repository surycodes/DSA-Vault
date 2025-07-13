
import { DSAQuestion } from '@/types';

const QUESTIONS_KEY = 'dsa-questions';

export const loadQuestionsFromStorage = (): DSAQuestion[] => {
  const stored = localStorage.getItem(QUESTIONS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveQuestionsToStorage = (questions: DSAQuestion[]): void => {
  localStorage.setItem(QUESTIONS_KEY, JSON.stringify(questions));
};

export const addQuestionToStorage = (question: DSAQuestion): void => {
  const existingQuestions = loadQuestionsFromStorage();
  const updatedQuestions = [...existingQuestions, question];
  saveQuestionsToStorage(updatedQuestions);
};

export const updateQuestionInStorage = (updatedQuestion: DSAQuestion): void => {
  const existingQuestions = loadQuestionsFromStorage();
  const updatedQuestions = existingQuestions.map(q => 
    q.id === updatedQuestion.id ? updatedQuestion : q
  );
  saveQuestionsToStorage(updatedQuestions);
};

export const deleteQuestionFromStorage = (questionId: string): void => {
  const existingQuestions = loadQuestionsFromStorage();
  const updatedQuestions = existingQuestions.filter(q => q.id !== questionId);
  saveQuestionsToStorage(updatedQuestions);
};
