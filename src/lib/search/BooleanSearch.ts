import { InvertedIndex } from '../inverted-index/InvertedIndex';
import type { SearchResult, BooleanQuery, Posting } from '../inverted-index/types';
import { QueryParser } from './QueryParser';

export class BooleanSearch {
  private index: InvertedIndex;

  constructor(index: InvertedIndex) {
    this.index = index;
  }

  search(query: string): SearchResult[] {
    const parsed = QueryParser.parse(query);
    let postings: Posting[];

    if (QueryParser.isBooleanQuery(parsed)) {
      postings = this.executeBooleanQuery(parsed);
    } else {
      // Simple multi-term search (treat as AND)
      postings = this.executeAndQuery(parsed);
    }

    return this.convertToSearchResults(postings, 
      QueryParser.isBooleanQuery(parsed) ? parsed.terms : parsed
    );
  }

  private executeBooleanQuery(query: BooleanQuery): Posting[] {
    switch (query.operator) {
      case 'AND':
        return this.executeAndQuery(query.terms);
      case 'OR':
        return this.executeOrQuery(query.terms);
      case 'NOT':
        return this.executeNotQuery(query.terms[0]);
      default:
        return [];
    }
  }

  private executeAndQuery(terms: string[]): Posting[] {
    if (terms.length === 0) return [];

    const postingLists = terms
      .map(term => this.index.search(term))
      .filter(list => list.length > 0);

    if (postingLists.length === 0) return [];
    if (postingLists.length === 1) return postingLists[0];

    // Intersect all posting lists
    let result = postingLists[0];
    for (let i = 1; i < postingLists.length; i++) {
      const docIds = new Set(postingLists[i].map(p => p.docId));
      result = result.filter(p => docIds.has(p.docId));
    }

    return result;
  }

  private executeOrQuery(terms: string[]): Posting[] {
    const allPostings = new Map<string, Posting>();

    terms.forEach(term => {
      const postings = this.index.search(term);
      postings.forEach(p => {
        if (!allPostings.has(p.docId)) {
          allPostings.set(p.docId, p);
        }
      });
    });

    return Array.from(allPostings.values());
  }

  private executeNotQuery(term: string): Posting[] {
    const excludedDocs = new Set(
      this.index.search(term).map(p => p.docId)
    );

    // Get all documents that don't contain the term
    const allEntries = this.index.getAllEntries();
    const allDocIds = new Set<string>();

    allEntries.forEach(entry => {
      entry.postingList.postings.forEach(p => {
        if (!excludedDocs.has(p.docId)) {
          allDocIds.add(p.docId);
        }
      });
    });

    // Convert to postings
    return Array.from(allDocIds).map(docId => ({
      docId,
      positions: [],
      termFrequency: 0
    }));
  }

  private convertToSearchResults(
    postings: Posting[],
    matchedTerms: string[]
  ): SearchResult[] {
    return postings.map(posting => {
      const doc = this.index.getDocument(posting.docId);
      if (!doc) {
        return {
          docId: posting.docId,
          score: 0,
          title: 'Unknown',
          snippet: '',
          matchedTerms
        };
      }

      const snippet = this.generateSnippet(doc.content, matchedTerms);

      return {
        docId: posting.docId,
        score: posting.termFrequency,
        title: doc.title,
        snippet,
        matchedTerms
      };
    });
  }

  private generateSnippet(content: string, terms: string[]): string {
    const words = content.split(/\s+/);
    const lowerContent = content.toLowerCase();
    
    // Find first occurrence of any term
    let startIndex = -1;
    for (const term of terms) {
      const index = lowerContent.indexOf(term.toLowerCase());
      if (index !== -1 && (startIndex === -1 || index < startIndex)) {
        startIndex = index;
      }
    }

    if (startIndex === -1) {
      return words.slice(0, 20).join(' ') + '...';
    }

    // Get words around the found term
    const beforeStart = Math.max(0, startIndex - 50);
    const afterEnd = Math.min(content.length, startIndex + 100);
    let snippet = content.substring(beforeStart, afterEnd);

    if (beforeStart > 0) snippet = '...' + snippet;
    if (afterEnd < content.length) snippet = snippet + '...';

    return snippet;
  }
}
