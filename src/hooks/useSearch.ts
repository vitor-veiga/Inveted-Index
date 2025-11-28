import { useState, useCallback } from 'react';
import { BooleanSearch } from '../lib/search/BooleanSearch';
import { LinearSearch } from '../lib/search/LinearSearch';
import { InvertedIndex } from '../lib/inverted-index/InvertedIndex';
import type { SearchResult, PerformanceMetrics, Document } from '../lib/inverted-index/types';

export function useSearch(index: InvertedIndex, documents: Document[]) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);

  const searchWithIndex = useCallback((query: string) => {
    if (!query.trim()) {
      setResults([]);
      setMetrics(null);
      return;
    }

    setIsSearching(true);
    const startTime = performance.now();

    const booleanSearch = new BooleanSearch(index);
    const searchResults = booleanSearch.search(query);

    const endTime = performance.now();

    setResults(searchResults);
    setMetrics({
      method: 'inverted-index',
      queryTime: endTime - startTime,
      resultsFound: searchResults.length,
      documentsScanned: index.getTotalDocuments()
    });
    setIsSearching(false);
  }, [index]);

  const searchLinear = useCallback((query: string) => {
    if (!query.trim()) {
      setResults([]);
      setMetrics(null);
      return;
    }

    setIsSearching(true);
    const linearSearch = new LinearSearch(documents);
    const { results: searchResults, metrics: searchMetrics } = linearSearch.search(query);

    setResults(searchResults);
    setMetrics(searchMetrics);
    setIsSearching(false);
  }, [documents]);

  const clearResults = useCallback(() => {
    setResults([]);
    setMetrics(null);
  }, []);

  return {
    results,
    isSearching,
    metrics,
    searchWithIndex,
    searchLinear,
    clearResults
  };
}
