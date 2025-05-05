import { useMemo } from 'react';
import verbTensesData from '../data/verbTensesData';

export const useVerbTense = (id: string | undefined) => {
  const tense = useMemo(() => {
    if (!id) return null;
    return verbTensesData.find(t => t.id === id) || null;
  }, [id]);

  return tense;
}; 