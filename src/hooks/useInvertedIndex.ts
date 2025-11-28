import { useState, useCallback } from 'react';
import { InvertedIndex } from '../lib/inverted-index/InvertedIndex';
import type { Document, IndexEntry, HashTableStats } from '../lib/inverted-index/types';

export function useInvertedIndex(initialDocuments: Document[] = []) {
  const [index] = useState(() => {
    const newIndex = new InvertedIndex();
    initialDocuments.forEach(doc => newIndex.addDocument(doc));
    return newIndex;
  });
  const [isIndexed, setIsIndexed] = useState(initialDocuments.length > 0);
  const [stats, setStats] = useState<HashTableStats | null>(() => 
    initialDocuments.length > 0 ? index.getHashTableStats() : null
  );

  const updateStats = useCallback(() => {
    setStats(index.getHashTableStats());
  }, [index]);

  const addDocument = (doc: Document) => {
    index.addDocument(doc);
    updateStats();
  };

  const getAllTerms = () => index.getAllTerms();

  const getAllEntries = (): IndexEntry[] => index.getAllEntries();

  const search = (term: string) => index.search(term);

  const clear = () => {
    index.clear();
    setIsIndexed(false);
    setStats(null);
  };

  return {
    index,
    isIndexed,
    stats,
    addDocument,
    getAllTerms,
    getAllEntries,
    search,
    clear,
    updateStats
  };
}
