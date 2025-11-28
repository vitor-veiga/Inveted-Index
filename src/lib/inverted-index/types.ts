// Types for the Inverted Index implementation

export interface Posting {
  docId: string;
  positions: number[];
  termFrequency: number;
}

export interface PostingListNode {
  posting: Posting;
  next: PostingListNode | null;
}

export interface PostingList {
  term: string;
  documentFrequency: number;
  postings: Posting[];
}

export interface Document {
  id: string;
  title: string;
  content: string;
  wordCount: number;
}

export interface IndexEntry {
  term: string;
  postingList: PostingList;
}

export interface SearchResult {
  docId: string;
  score: number;
  title: string;
  snippet: string;
  matchedTerms: string[];
}

export interface BooleanQuery {
  operator: 'AND' | 'OR' | 'NOT';
  terms: string[];
}

export interface TFIDFScore {
  docId: string;
  term: string;
  tf: number;
  idf: number;
  tfidf: number;
}

export interface PerformanceMetrics {
  method: 'linear' | 'inverted-index';
  queryTime: number;
  resultsFound: number;
  documentsScanned: number;
}

export interface AnimationStep {
  stepNumber: number;
  description: string;
  highlightedTerms: string[];
  currentDocuments: string[];
  operation: string;
}

export interface HashTableStats {
  size: number;
  loadFactor: number;
  collisions: number;
  uniqueTerms: number;
}
